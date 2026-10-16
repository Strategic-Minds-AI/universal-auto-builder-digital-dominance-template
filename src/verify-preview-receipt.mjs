#!/usr/bin/env node
// Deterministic offline attestation for existing Universal Factory synthetic previews.
// No queue submission, deployment, fact checking, or independent-review claims.
import { createHash } from 'node:crypto';
import { readFile, realpath } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const noindex = html => /<meta\b[^>]*name\s*=\s*["']robots["'][^>]*content\s*=\s*["'][^"']*\bnoindex\b/i.test(html)
  || /<meta\b[^>]*content\s*=\s*["'][^"']*\bnoindex\b[^"']*["'][^>]*name\s*=\s*["']robots["']/i.test(html);
const nofollow = html => /<meta\b[^>]*name\s*=\s*["']robots["'][^>]*content\s*=\s*["'][^"']*\bnofollow\b/i.test(html)
  || /<meta\b[^>]*content\s*=\s*["'][^"']*\bnofollow\b[^"']*["'][^>]*name\s*=\s*["']robots["']/i.test(html);

export async function verifyPreviewReceipt(receiptPath) {
  const checks = [];
  const check = (name, pass, detail = '') => checks.push({ name, result: pass ? 'PASS' : 'FAIL', ...(detail ? { detail } : {}) });
  const resolvedReceipt = resolve(receiptPath);
  let root, receipt;
  try {
    root = await realpath(dirname(resolvedReceipt));
    receipt = JSON.parse(await readFile(resolvedReceipt, 'utf8'));
  } catch (err) {
    return { status: 'FAIL', scope: 'LOCAL_STATIC_ARTIFACTS_ONLY', checks: [{ name: 'parse_receipt', result: 'FAIL', detail: err.message }], sites_verified: 0, external_http: 'UNKNOWN', independent_validation: 'UNKNOWN', release_eligible: false };
  }
  check('preview_only', receipt?.mode === 'preview' && receipt?.deployed === false && receipt?.indexable === false && receipt?.approved_for_release === false);
  check('no_false_independent_qa', receipt?.independent_validation === 'UNKNOWN');
  const sites = Array.isArray(receipt?.sites) ? receipt.sites : [];
  check('site_manifest_present', sites.length > 0);
  let robots = '';
  try { robots = await readFile(resolve(root, 'robots.txt'), 'utf8'); } catch { /* recorded below */ }
  check('robots_disallow_all', /^\s*User-agent\s*:\s*\*\s*\r?\n\s*Disallow\s*:\s*\/\s*$/i.test(robots));
  const seen = new Set();
  let verified = 0;
  for (const [index, site] of sites.entries()) {
    const label = `site_${index}`;
    const rel = site?.relative_file;
    const validPath = typeof rel === 'string' && !isAbsolute(rel) && !rel.includes('\\') &&
      rel.split('/').every(s => s !== '' && s !== '.' && s !== '..') && rel.endsWith('/index.html');
    check(`${label}_manifest`, site?.public_url === null && site?.status === 'preview_generated' &&
      typeof site?.sha256 === 'string' && /^[a-f0-9]{64}$/.test(site.sha256) && validPath);
    if (!validPath) continue;
    check(`${label}_unique`, !seen.has(rel));
    seen.add(rel);
    const target = resolve(root, rel);
    const withinRoot = relative(root, target);
    if (withinRoot.startsWith('..' + sep) || withinRoot === '..' || isAbsolute(withinRoot)) {
      check(`${label}_path_isolated`, false);
      continue;
    }
    let realTarget, bytes;
    try { realTarget = await realpath(target); bytes = await readFile(realTarget); }
    catch { check(`${label}_file_exists`, false); continue; }
    const actualRelative = relative(root, realTarget);
    const isolated = !(actualRelative === '..' || actualRelative.startsWith('..' + sep) || isAbsolute(actualRelative));
    check(`${label}_path_isolated`, isolated);
    if (!isolated) continue;
    const html = bytes.toString('utf8');
    const hashMatches = digest(bytes) === site.sha256;
    check(`${label}_sha256`, hashMatches);
    check(`${label}_meta_noindex_nofollow`, noindex(html) && nofollow(html));
    check(`${label}_preview_label`, /PREVIEW ONLY\s*\/\s*NOINDEX\s*\/\s*NOT DEPLOYED/.test(html));
    check(`${label}_contact_disabled`, !/<form\b/i.test(html) && !/href\s*=\s*["']\s*(?:tel:|mailto:)/i.test(html));
    if (hashMatches && noindex(html) && nofollow(html)) verified++;
  }
  const failed = checks.filter(c => c.result === 'FAIL');
  return {
    status: failed.length ? 'FAIL' : 'PASS',
    scope: 'LOCAL_STATIC_ARTIFACTS_ONLY',
    verification_sha256: digest(Buffer.from(JSON.stringify(checks))),
    source_pack_id: typeof receipt?.pack_id === 'string' ? receipt.pack_id : null,
    sites_expected: sites.length,
    sites_verified: verified,
    checks,
    external_http: 'UNKNOWN',
    visual_parity: 'UNKNOWN',
    independent_validation: 'UNKNOWN',
    release_eligible: false,
    deployed: false
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  if (!process.argv[2]) {
    console.error('Usage: node src/verify-preview-receipt.mjs <dist/preview/receipt.json>');
    process.exitCode = 2;
  } else {
    verifyPreviewReceipt(process.argv[2]).then(report => {
      console.log(JSON.stringify(report, null, 2));
      if (report.status !== 'PASS') process.exitCode = 1;
    }).catch(err => { console.error(err.message); process.exitCode = 1; });
  }
}
