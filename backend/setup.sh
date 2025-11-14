#!/bin/bash

# Setup script to fix pnpm ENOENT error
echo "🔧 Fixing pnpm ENOENT error..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
    
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install pnpm globally. Trying alternative approach..."
        echo "💡 Using npx to run pnpm commands instead"
        
        # Create a wrapper script for pnpm
        echo '#!/bin/bash' > /usr/local/bin/pnpm
        echo 'npx pnpm@latest "$@"' >> /usr/local/bin/pnpm
        chmod +x /usr/local/bin/pnpm
        
        # Test the wrapper
        if pnpm --version &> /dev/null; then
            echo "✅ pnpm wrapper created successfully"
        else
            echo "❌ Failed to create pnpm wrapper"
            echo "Please run: npm install -g pnpm"
            exit 1
        fi
    fi
fi

echo "📦 Installing project dependencies..."
pnpm install

echo "🔧 Generating Prisma client..."
pnpm db:generate

echo "🔍 Running type check..."
pnpm typecheck

echo "✅ Setup complete! The backend is ready to run."
echo ""
echo "To start the development server:"
echo "  pnpm dev"
echo ""
echo "Available commands:"
echo "  pnpm db:generate  - Generate Prisma client"
echo "  pnpm typecheck    - Run TypeScript type checking"
echo "  pnpm eslint       - Run ESLint"
echo "  pnpm prettier     - Format code"
echo "  pnpm test         - Run tests"