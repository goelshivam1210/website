#!/usr/bin/env bash
# Copy the canonical CV PDF into the site. Override with CV_SRC=... if needed.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="${CV_SRC:-$HOME/Desktop/research/CV/main.pdf}"
DST="$ROOT/public/cv.pdf"

if [[ -f "$SRC" ]]; then
  cp "$SRC" "$DST"
  echo "Synced CV → public/cv.pdf"
else
  if [[ -f "$DST" ]]; then
    echo "CV source not found at $SRC — keeping existing public/cv.pdf (e.g. CI/deploy)."
  else
    echo "error: no CV at $SRC and no public/cv.pdf" >&2
    exit 1
  fi
fi
