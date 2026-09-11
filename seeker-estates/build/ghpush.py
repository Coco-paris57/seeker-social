#!/usr/bin/env python3
"""Push files to the seeker-social repo via GitHub Contents API. Usage: ghpush.py <dest_folder> <file>... ; prints raw URLs."""
import sys, json, base64, subprocess, os
OWNER="Coco-paris57"; REPO="seeker-social"; API=f"https://api.github.com/repos/{OWNER}/{REPO}"
def api(method,path,body=None):
    cmd=["curl","-sS","-X",method,"-H","X-GitHub-Api-Version: 2022-11-28","-H","Accept: application/vnd.github+json",API+path]
    if body is not None: cmd+=["-H","Content-Type: application/json","--data-binary","@-"]
    r=subprocess.run(cmd,input=json.dumps(body).encode() if body is not None else None,capture_output=True)
    try: return json.loads(r.stdout.decode())
    except Exception: return {"raw":r.stdout.decode()[:300],"err":r.stderr.decode()[:300]}
def push(dest,files):
    info=api("GET",""); branch=info.get("default_branch","main")
    out=[]
    for f in files:
        name=os.path.basename(f); path=f"{dest}/{name}"
        data=base64.b64encode(open(f,"rb").read()).decode()
        existing=api("GET",f"/contents/{path}")
        body={"message":f"add {path}","content":data,"branch":branch}
        if isinstance(existing,dict) and existing.get("sha"): body["sha"]=existing["sha"]
        r=api("PUT",f"/contents/{path}",body)
        if "content" in r:
            url=f"https://raw.githubusercontent.com/{OWNER}/{REPO}/{branch}/{path}"; out.append(url); print("ok ",url)
        else: print("FAIL",path,json.dumps(r)[:300]); sys.exit(1)
    return out
if __name__=="__main__":
    dest=sys.argv[1]; push(dest,sys.argv[2:])
