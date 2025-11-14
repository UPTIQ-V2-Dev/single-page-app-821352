#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

async function installPnpm() {
    console.log('🔧 Setting up pnpm...');
    
    try {
        // First, try to check if pnpm already exists
        await execAsync('pnpm --version');
        console.log('✅ pnpm is already available');
        return true;
    } catch (error) {
        console.log('📦 pnpm not found, attempting installation...');
    }
    
    try {
        // Try corepack first
        console.log('🔍 Trying corepack method...');
        await execAsync('corepack enable');
        await execAsync('corepack prepare pnpm@latest --activate');
        
        // Verify installation
        await execAsync('pnpm --version');
        console.log('✅ pnpm installed successfully via corepack');
        return true;
    } catch (corepackError) {
        console.log('⚠️ Corepack method failed, trying npm global install...');
        
        try {
            await execAsync('npm install -g pnpm');
            await execAsync('pnpm --version');
            console.log('✅ pnpm installed successfully via npm');
            return true;
        } catch (npmError) {
            console.log('⚠️ Global npm install failed');
            return false;
        }
    }
}

async function runBuild() {
    try {
        const pnpmAvailable = await installPnpm();
        
        if (pnpmAvailable) {
            console.log('📦 Installing dependencies with pnpm...');
            await execAsync('pnpm install');
            
            console.log('🔨 Building project with pnpm...');
            await execAsync('pnpm run build');
            
            console.log('✅ Build completed successfully with pnpm!');
        } else {
            console.log('📦 Falling back to npm...');
            
            // Remove pnpm lock file for npm compatibility
            try {
                const fs = require('fs');
                if (fs.existsSync('pnpm-lock.yaml')) {
                    fs.unlinkSync('pnpm-lock.yaml');
                    console.log('🗑️ Removed pnpm-lock.yaml for npm compatibility');
                }
            } catch (err) {
                console.log('⚠️ Could not remove pnpm-lock.yaml');
            }
            
            await execAsync('npm install');
            await execAsync('npm run build');
            console.log('✅ Build completed successfully with npm!');
        }
        
    } catch (error) {
        console.error('❌ Build failed:', error.message);
        
        // Try to show more helpful error information
        if (error.stdout) console.log('STDOUT:', error.stdout);
        if (error.stderr) console.log('STDERR:', error.stderr);
        
        process.exit(1);
    }
}

// Run the setup and build process
runBuild();