import { green, red, yellow } from 'colors';
import { writeFile } from 'fs';
import { resolve } from 'path';
import { version } from '../package.json';

const filePath = resolve(`src/client/app/core/version.ts`);
const src = `export const version = '${version}';
`;

writeFile(filePath, src, { flag: 'w' }, (err: NodeJS.ErrnoException) => {
    if (err) {
        console.log(red(err.message));

        return;
    }

    console.log(green(`Wrote version ${yellow(version)}`));
});
