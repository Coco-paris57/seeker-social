"""Command line: python -m rm.cli <command>   (run from seeker-estates/revenue)

  check      test the Smoobu key/secret and confirm the id map against Smoobu apartments
  ingest     convert raw PriceLabs connector JSON (data/snapshots/<date>/raw/) to CSVs
  smoobu     add Smoobu stored rates to prices.csv (sync check)
  template   create today's snapshot folder with empty CSVs for manual inputs
  analyse    build reports/<date>/kpi_pack.json and kpi_summary.md

PriceLabs data comes from the PriceLabs connector (see the daily-revenue-run skill).
"""
import json
import sys

from . import analyse, config, snapshot


def check():
    """Smoobu credentials, without ever printing the secret."""
    import re
    key, secret = config.SMOOBU_API_KEY or "", config.SMOOBU_API_SECRET or ""
    if not key or not secret:
        print("Smoobu: SMOOBU_API_KEY and/or SMOOBU_API_SECRET not set")
        return False
    bad = sorted(set(re.sub(r"[A-Za-z0-9+/=]", "", secret)))
    if key != key.strip() or secret != secret.strip():
        print("Smoobu: key or secret has leading/trailing spaces")
    if bad:
        print(f"Smoobu: secret contains characters a Smoobu secret never has: {bad} "
              "- re-copy it with Smoobu's copy button")
    from .smoobu import Smoobu
    try:
        apts = Smoobu().apartments().get("apartments", [])
    except Exception as e:
        print(f"Smoobu: FAILED {str(e)[-120:]}")
        return False
    print(f"Smoobu: OK, {len(apts)} apartments")
    names = {str(a["id"]): a["name"] for a in apts}
    for ref, v in json.loads(config.ID_MAP_FILE.read_text()).items():
        if not ref.startswith("_") and v.get("smoobu"):
            print(f"  {ref} smoobu {v['smoobu']}: {names.get(str(v['smoobu']), 'NOT FOUND in Smoobu')}")
    return True


def main(argv):
    cmd = argv[1] if len(argv) > 1 else "help"
    if cmd == "check":
        sys.exit(0 if check() else 1)
    elif cmd == "ingest":
        from .pricelabs_ingest import ingest
        print(ingest(argv[2] if len(argv) > 2 else None))
    elif cmd == "smoobu":
        print(snapshot.pull_smoobu(day=argv[2] if len(argv) > 2 else None), "Smoobu rate rows")
    elif cmd == "template":
        print(snapshot.write_templates())
    elif cmd == "analyse":
        print(analyse.run(argv[2] if len(argv) > 2 else None))
    else:
        print(__doc__)


if __name__ == "__main__":
    main(sys.argv)
