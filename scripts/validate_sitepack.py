#!/usr/bin/env python3
"""Static validation only. This script never connects to providers or deploys."""
import json,sys
from pathlib import Path

def validate(data):
    errs=[]
    for k in ['pack_id','version','source','brand','industry','design','locations','provisioning']:
        if k not in data: errs.append('missing '+k)
    p=data.get('provisioning',{})
    if p.get('mode')!='preview' or p.get('approval_required') is not True or p.get('noindex_until_validated') is not True:
        errs.append('preview, approval_required and noindex_until_validated are mandatory')
    source=data.get('source',{})
    if not all(source.get(k) for k in ('repository','commit_sha','template_id')): errs.append('source provenance incomplete')
    if len(source.get('commit_sha',''))<7: errs.append('source commit too short')
    places=data.get('locations',[])
    if not places: errs.append('no locations')
    seen=set()
    for i,loc in enumerate(places):
        key=(loc.get('city','').casefold(),loc.get('region','').casefold(),loc.get('country','').casefold())
        if key in seen: errs.append(f'duplicate location {i}')
        seen.add(key)
        if loc.get('verified_service_area') is not True: errs.append(f'location {i}: service area not verified')
        if len(loc.get('unique_value','').strip())<30: errs.append(f'location {i}: insufficient unique local value')
    return errs

if __name__=='__main__':
    data=json.loads(Path(sys.argv[1]).read_text(encoding='utf-8'))
    errors=validate(data)
    print(json.dumps({'valid':not errors,'errors':errors},indent=2))
    sys.exit(bool(errors))
