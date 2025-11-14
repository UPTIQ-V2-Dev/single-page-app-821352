#!/bin/bash

# Function to install pnpm
install_pnpm() {
    echo "Installing pnpm..."
    
    # Method 1: Try corepack (comes with Node.js 16.10+)
    if command -v corepack >/dev/null 2>&1; then
        echo "Using corepack to enable pnpm..."
        corepack enable
        corepack prepare pnpm@latest --activate
        export PATH="$HOME/.local/share/pnpm:$PATH"
    else
        # Method 2: Download and install pnpm directly
        echo "Downloading pnpm installer..."
        curl -fsSL https://get.pnpm.io/install.sh | sh -
        
        # Add pnpm to PATH
        export PNPM_HOME="$HOME/.local/share/pnpm"
        export PATH="$PNPM_HOME:$PATH"
        source ~/.bashrc 2>/dev/null || true
    fi
}

# Check if pnpm is already available
if ! command -v pnpm >/dev/null 2>&1; then
    install_pnpm
fi

# Verify pnpm is now available
if command -v pnpm >/dev/null 2>&1; then
    echo "✅ pnpm is available"
    pnpm --version
    
    # Install dependencies and build
    echo "Installing dependencies..."
    pnpm install
    
    echo "Building project..."
    pnpm run build
    
    echo "✅ Build completed successfully!"
else
    echo "❌ Failed to install pnpm, falling back to npm..."
    
    # Remove pnpm lock file and use npm
    [ -f pnpm-lock.yaml ] && rm pnpm-lock.yaml
    
    npm install
    npm run build
    
    echo "✅ Build completed with npm!"
fi