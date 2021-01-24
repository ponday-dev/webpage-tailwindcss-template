import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import cssnano from 'cssnano';

import { findFiles, isProd, outDir, srcDir } from './utils';

const plugins = [
    tailwindcss('./tailwind.config.js'),
    autoprefixer(),
    postcssImport(),
    postcssNested(),
];

if (isProd()) {
    plugins.push(cssnano({ autoprefixer: false }));
}

findFiles(srcDir, 'css').forEach(file => fs.readFile(file, { encoding: 'utf-8' }, async (err, data) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    const distFile = path.resolve(outDir, path.basename(file));
    const result = await postcss(plugins).process(data, { from: file, to: distFile });
    fs.writeFile(distFile, result.css, (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });
}));
