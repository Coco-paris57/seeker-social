"""Command line: python -m rm.cli <command>   (run from seeker-estates/revenue)

  check      test API keys and connectivity
  ids        list PriceLabs and Smoobu listings to build data/id_map.json
  template   create today's snapshot folder with empty CSVs for manual inputs
  pull       pull PriceLabs + Smoobu into today's snapshot
  analyse    build reports/<date>/kpi_pack.json and kpi_summary.md
  daily      pull + analyse
"""
import json
import sys

from . import analyse, config, snapshot


def check():
    ok = True
    for name, key, fn in (("PriceLabs", config.PRICELABS_API_KEY, lambda: __import__("rm.pricelabs", fromlist=["x"]).PriceLabs().listings()),
                          ("Smoobu", config.SMOOBU_API_KEY, lambda: __import__("rm.smoobu", fromlist=["x"]).Smoobu().apartments())):
        if not key:
            print(f"{name}: API key not set")
            ok = False
            continue
        try:
            fn()
            print(f"{name}: OK")
        except Exception as e:
            print(f"{name}: FAILED {e}")
            ok = False
    return ok


def ids():
    from .pricelabs import PriceLabs
    from .smoobu import Smoobu
    print("PriceLabs listings:")
    for l in PriceLabs().listings().get("listings", []):
        print(f"  {l.get('id')}\t{l.get('pms')}\t{l.get('name')}")
    print("Smoobu apartments:")
    for a in Smoobu().apartments().get("apartments", []):
        print(f"  {a.get('id')}\t{a.get('name')}")
    print(f"\nMap each to a ref (P01..P19) in {config.ID_MAP_FILE}")


def main(argv):
    cmd = argv[1] if len(argv) > 1 else "help"
    if cmd == "check":
        sys.exit(0 if check() else 1)
    elif cmd == "ids":
        ids()
    elif cmd == "template":
        print(snapshot.write_templates())
    elif cmd == "pull":
        print(snapshot.pull_live())
    elif cmd == "analyse":
        print(analyse.run(argv[2] if len(argv) > 2 else None))
    elif cmd == "daily":
        snapshot.pull_live()
        snapshot.write_templates()
        print(analyse.run())
    else:
        print(__doc__)


if __name__ == "__main__":
    main(sys.argv)
