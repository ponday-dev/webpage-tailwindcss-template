import fs from 'fs';
import path from 'path';
import { findFiles, outDir } from './utils';

const assetExts = [
    'png',
    'jpg',
    'jpeg',
    'svg',
    'ico',
];

const assetsDir = path.resolve(__dirname, '..', 'assets');

findFiles(assetsDir, assetExts).forEach(file => {
    const distFile = path.resolve(outDir, path.basename(file));
    fs.copyFileSync(file, distFile);
});
