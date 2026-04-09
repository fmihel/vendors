/* eslint-disable prefer-destructuring */
import {
    existsSync, mkdirSync, readdirSync, renameSync, unlinkSync,
} from 'fs';
import { join, dirname, extname } from 'path';
import params from './_core/params.js';
import unzip from './_core/unzip.js';
import zip from './_core/zip.js';
import renameWithDate from './_core/renameWithDate.js';
import version from './_core/version.js';
import branches from './_core/branches.js';
import define from './_core/define.js';
import compareFiles from './_core/compareFiles.js';

const {
    operation, branch, mode, archPath, distPath, projectName, projectPath,
} = params;

/**
 * устанавливаем сохраненные архивы
 * Ex: автоопределение ветки и пути к архиву ( архивы лежат тамже где и скрипты )
 * $ node /../../install
 * Ex: установка др ветки
 * $ node /../../install -branch beta
 *
 * параметры
 * -o[opartion]     тип операции update или install (default = update)
 * -p[roject]       маршрут к проекту ( по умолчанию там где запускаем install)
 * -n[ame]          имя проекта (папка в корневой папке архива)
 * -a[rch]          путь к архиву ( если задать, то след парметры будут игнориться)
 * -b[ranche]       ветка (архив называется по имени ветки)
 * -m[ode]          режим установки ( prod или dev )
 */

// маршрут к index.js
// const cwd = path.dirname(require.main.filename);
// путь к папке где запускаем
// process.cwd();

try {
    if (operation === 'install') {
        console.log('vendors install ----------');
        console.log('  branch :', branch);
        console.log('  mode   :', mode);
        console.log('  from   :', archPath);
        console.log('  to     :', distPath);
        console.log('--------------------------');

        if (!existsSync(archPath)) {
            throw new Error(`Архив не найден: ${archPath}`);
        }

        if (!existsSync(distPath)) {
            mkdirSync(distPath, { recursive: true });
        }
        unzip(archPath, distPath);
    } else if (operation === 'update') {
        console.log('vendors update -----------');
        console.log('  branch :', branch);
        console.log('  mode   :', mode);
        console.log('  from   :', distPath);
        console.log('  to     :', archPath);

        // const backup = renameWithDate(archPath);
        // создаем новый архив
        const newFile = await zip(
            join(distPath, 'vendor'),
            `${branch}-new.zip`,
            dirname(archPath),
        );

        const currentFile = join(dirname(archPath), `${branch}.zip`); // текущий файл

        let status = 'undef';
        if (existsSync(currentFile)) {
            // сравниваем текущий и новый
            const isEqual = await compareFiles(currentFile, newFile);
            if (isEqual) {
                // равны, то новая копия не нужна
                unlinkSync(newFile);
                status = 'no need to update';
            } else {
                // создаем backup
                const backup = renameWithDate(archPath);
                // новый переименовываем в текущий
                renameSync(newFile, currentFile);
                status = `update : ${currentFile}`;
            }
        } else {
            renameSync(newFile, currentFile);
            status = `create : ${currentFile}`;
        }
        console.log('');
        console.log(`result   : ok ( ${status} )`);
        console.log('--------------------------');
    } else if (operation === 'help' || operation === '?') {
        console.log(`vendors ${version()} help ---------------------------------------------`);
        console.log('полный список опций');
        console.log('  -o[operation]   - тип операции update, install, clear');
        console.log('  -p[roject]     - маршрут к проекту ( по умолчанию там где запускаем install');
        console.log('  -n[ame]        - имя проекта (папка в корневой папке архива');
        console.log('  -a[rch]        - путь к архиву ( если задать, то след парметры будут игнориться');
        console.log('  -b[ranche]     - ветка (архив называется по имени ветки');
        console.log('  -m[ode]        - режим установки ( prod или dev )');
        console.log('');
        console.log('примеры');
        console.log('  (1): update production (path /dist)');
        console.log('  $ node ../../vendors -o update');
        console.log('  (2): install production (path /dist)');
        console.log('  $ node ../../vendors -o install');
        console.log('');
        console.log('----------------------------------------------------------------');
    } else if (operation === 'clear') {
        const namedir = dirname(define.require_main_filename);
        const bs = branches(); // существующие ветки
        // const exists = []; // существующие сохраненные ветки, но несуществуюющие в branches (по именам zip фалов в папках prod и dev)
        const files = []; // список файлов к удалению

        ['prod', 'dev'].map((md) => {
            const dir = join(namedir, projectName, md);
            const zips = readdirSync(dir).filter((file) => extname(file).toLowerCase() === '.zip');
            zips.map((name) => {
                const index = name.replace(/(_\d{6})?\.zip$/, '');
                if (bs.indexOf(index) === -1) {
                    files.push(join(dir, name));
                    // if (exists.indexOf(index) === -1) {
                    //     exists.push(index);
                    // }
                }
            });
        });
        // удаляем все файлы для несущесвующих веток
        files.map((name) => {
            try {
                unlinkSync(name);
            } catch (e) {
                console.error(e);
            }
        });
    } else {
        console.log(`vendors ${version()} --------------------------------------------------`);
        console.log('  branch     :', branch);
        console.log('  mode       :', mode);
        console.log('  distPath   :', distPath);
        console.log('  archPath   :', archPath);
        console.log('  projectName:', projectName);
        console.log('  projectPath:', projectPath);
        console.log('');
        console.log('  help        :', '$ node xxx/vendors -o ?');
        console.log('----------------------------------------------------------------');
    }
} catch (err) {
    const red = '\x1b[31m';
    const reset = '\x1b[0m';
    console.error(`${red}Ошибка: ${err.message}${reset}`);
    // console.error(`Ошибка: ${err.message}`);
    process.exit(1);
}
