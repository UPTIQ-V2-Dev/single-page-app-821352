const { execSync } = require('child_process');
const fs = require('fs');

async function setupPnpm() {
    try {
        console.log('Checking for pnpm...');
        
        // Try to enable pnpm via corepack first
        try {
            console.log('Attempting to enable pnpm via corepack...');
            execSync('corepack enable', { stdio: 'inherit' });
            execSync('corepack prepare pnpm@latest --activate', { stdio: 'inherit' });
            console.log('✅ pnpm enabled via corepack');
        } catch (corepackError) {
            console.log('Corepack not available, trying npm installation...');
            
            // Try to install pnpm globally via npm
            try {
                execSync('npm install -g pnpm', { stdio: 'inherit' });
                console.log('✅ pnpm installed globally via npm');
            } catch (npmError) {
                console.log('Global npm install failed, using npx fallback...');
                
                // Use npx as fallback
                execSync('npx pnpm install', { stdio: 'inherit' });
                execSync('npx pnpm run build', { stdio: 'inherit' });
                return;
            }
        }
        
        // Now try to use pnpm
        console.log('Installing dependencies with pnpm...');
        execSync('pnpm install', { stdio: 'inherit' });
        
        console.log('Building project with pnpm...');
        execSync('pnpm run build', { stdio: 'inherit' });
        
        console.log('✅ Build completed successfully!');
        
    } catch (error) {
        console.error('❌ Error during setup:', error.message);
        
        // Fallback to npm
        console.log('Falling back to npm...');
        try {
            // Remove pnpm-lock.yaml if it exists
            if (fs.existsSync('pnpm-lock.yaml')) {
                fs.unlinkSync('pnpm-lock.yaml');
                console.log('Removed pnpm-lock.yaml');
            }
            
            execSync('npm install', { stdio: 'inherit' });
            execSync('npm run build', { stdio: 'inherit' });
            console.log('✅ Build completed with npm fallback!');
        } catch (npmError) {
            console.error('❌ Both pnpm and npm failed:', npmError.message);
            process.exit(1);
        }
    }
}

setupPnpm();