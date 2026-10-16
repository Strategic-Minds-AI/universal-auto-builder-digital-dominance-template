import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { verifyPreviewReceipt } from '../src/verify-preview-receipt.mjs';
const html = '<!doctype html><html><head><meta name="robots" content="noindex, nofollow"></head><body>PREVIEW ONLY / NOINDEX / NOT DEPLOYED</body></html>';
const sha = s => createHash('sha256').update(s).digest('hex');
async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'universal-preview-qa-'));
  t.after(async () => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'synthetic-zz-us'));
  await writeFile(join(root, 'synthetic-zz-us', 'index.html'), html);
  await writeFile(join(root, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
  const receipt = {
    mode: 'preview', deployed: false, indexable: false, approved_for_release: false,
    independent_validation: 'UNKNOWN', pack_id: 'SYNTHETIC',
    sites: [{ relative_file: 'synthetic-zz-us/index.html', sha256: sha(html), public_url: null, status: 'preview_generated' }]
  };
  const path = join(root, 'receipt.json');
  await writeFile(path, JSON.stringify(receipt));
  return { root, path, receipt };
}
test('valid synthetic preview passes local-only checks without implying release', async t => {
  const { path } = await fixture(t);
  const result = await verifyPreviewReceipt(path);
  assert.equal(result.status, 'PASS');
  assert.equal(result.sites_verified, 1);
  assert.equal(result.external_http, 'UNKNOWN');
  assert.equal(result.independent_validation, 'UNKNOWN');
  assert.equal(result.release_eligible, false);
});
test('tampering with bytes breaks SHA-256', async t => {
  const { root, path } = await fixture(t);
  await writeFile(join(root, 'synthetic-zz-us', 'index.html'), html + '<p>modified</p>');
  const result = await verifyPreviewReceipt(path);
  assert.equal(result.status, 'FAIL');
  assert.ok(result.checks.some(c => c.name.endsWith('_sha256') && c.result === 'FAIL'));
});
test('noindex is not optional even when checksum matches', async t => {
  const { root, path, receipt } = await fixture(t);
  const modified = html.replace('noindex, nofollow', 'index, follow');
  await writeFile(join(root, 'synthetic-zz-us', 'index.html'), modified);
  receipt.sites[0].sha256 = sha(modified);
  await writeFile(path, JSON.stringify(receipt));
  assert.equal((await verifyPreviewReceipt(path)).status, 'FAIL');
});
test('rejects manifest pretending page is deployed', async t => {
  const { path, receipt } = await fixture(t);
  receipt.deployed = true;
  await writeFile(path, JSON.stringify(receipt));
  assert.equal((await verifyPreviewReceipt(path)).status, 'FAIL');
});
test('rejects hidden contact collection form', async t => {
  const { root, path, receipt } = await fixture(t);
  const altered = html.replace('</body>', '<form action="/lead"><input name="email"></form></body>');
  await writeFile(join(root, 'synthetic-zz-us', 'index.html'), altered);
  receipt.sites[0].sha256 = sha(altered);
  await writeFile(path, JSON.stringify(receipt));
  const result = await verifyPreviewReceipt(path);
  assert.ok(result.checks.some(c => c.name.endsWith('_contact_disabled') && c.result === 'FAIL'));
});
test('rejects traversal outside preview root', async t => {
  const { path, receipt } = await fixture(t);
  receipt.sites[0].relative_file = '../outside/index.html';
  await writeFile(path, JSON.stringify(receipt));
  assert.equal((await verifyPreviewReceipt(path)).status, 'FAIL');
});
test('rejects missing robots no-crawl', async t => {
  const { root, path } = await fixture(t);
  await writeFile(join(root, 'robots.txt'), 'User-agent: *\nAllow: /');
  assert.equal((await verifyPreviewReceipt(path)).status, 'FAIL');
});
test('missing receipt fails closed', async () => {
  const result = await verifyPreviewReceipt('/tmp/does-not-exist-' + process.pid + '/receipt.json');
  assert.equal(result.status, 'FAIL');
});
