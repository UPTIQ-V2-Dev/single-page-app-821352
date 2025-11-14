#!/bin/bash

# Install pnpm using corepack if available
if command -v corepack &> /dev/null; then
    corepack enable
    corepack prepare pnpm@latest --activate
fi

# Try to install pnpm if not available
if ! command -v pnpm &> /dev/null; then
    echo "Installing pnpm..."
    curl -fsSL https://get.pnpm.io/install.sh | sh -
    export PATH="$HOME/.local/share/pnpm:$PATH"
fi

# Install dependencies and build
if command -v pnpm &> /dev/null; then
    echo "Using pnpm..."
    pnpm install
    pnpm run build
else
    echo "Using npm as fallback..."
    npm install
    npm run build
fi