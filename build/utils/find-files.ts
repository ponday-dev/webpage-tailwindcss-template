import fs from 'fs';
import path from 'path';

export const findFiles = (locate: string , ext: string | string[], options: { ignorePrefix?: string } = { ignorePrefix: '_' }): string[] => {
    const targetExts = (ext instanceof Array ? ext : [ext]).map(e => e.trim());

    return fs.readdirSync(locate, { withFileTypes: true }).flatMap(dir => {
        const dirname = path.resolve(locate, dir.name);

        if (dir.isFile()) {
            return dirname;
        }
        return findFiles(dirname, ext);
    }).filter(file => {
        const ext = path.extname(file).substring(1);
        if (ext !== '' && !targetExts.includes(ext)) {
            return false;
        }
        if (options.ignorePrefix && path.basename(file).startsWith(options.ignorePrefix)) {
            return false;
        }
        return true;
    });
}
