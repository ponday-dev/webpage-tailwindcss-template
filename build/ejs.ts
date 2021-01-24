import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import { minify } from 'html-minifier-terser';
import { findFiles, isProd, srcDir, outDir } from './utils';

findFiles(srcDir, 'ejs').forEach(file => fs.readFile(file, { encoding: 'utf-8' }, (err, data) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    let result = ejs.render(data, {}, { filename: file, root: path.resolve(srcDir, 'pages') });
    if (isProd()) {
        result = minify(result, {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeComments: true,
        });
    }

    const distname = `${path.basename(file, '.ejs')}.html`;
    fs.writeFile(path.resolve(outDir, distname), result, (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });
}));
