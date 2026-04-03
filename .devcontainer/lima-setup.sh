#!/bin/bash
# Setup and serve the Jekyll site inside the Lima VM.
# Usage: limactl shell jekyll-dev -- bash /path/to/repo/.devcontainer/lima-setup.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"

cd "$REPO_DIR"

export GEM_HOME="$HOME/.gem"
export PATH="$HOME/.gem/bin:$PATH"

echo "==> Installing Ruby gems..."
bundle install

echo "==> Starting Jekyll..."
exec ./bin/entry_point.sh
