#********************************************
#!/bin/bash
set -x
set -e

dependency-check --project Testing --out . --scan . --disableRetireJS --disableAssembly -f XML