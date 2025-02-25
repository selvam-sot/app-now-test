import moduleAlias from 'module-alias';
import * as path from 'path';

// Adjust the base directory based on whether we're running from dist or src
const baseDir = path.resolve(__dirname).includes('dist') ? 
    path.join(__dirname, '..') : 
    path.join(__dirname);

// Define the aliases
const aliases = {
    '~': baseDir,
    '@': baseDir,
    '@controllers': path.join(baseDir, 'controllers'),
    '@models': path.join(baseDir, 'models'),
    '@routes': path.join(baseDir, 'routes'),
    '@middlewares': path.join(baseDir, 'middlewares'),
    '@utils': path.join(baseDir, 'utils'),
    '@config': path.join(baseDir, 'config'),
    '@services': path.join(baseDir, 'services')
};

// Register the aliases
moduleAlias.addAliases(aliases);

// Log the registered aliases for debugging
console.log('Registered module aliases:', aliases);