const fs = require('fs');
const path = require('path');
const params = require('./_core/params');
const { unzip } = require('./_core/unzip');
const { zip } = require('./_core/zip');
const { renameWithDate } = require('./_core/renameWithDate');
const { version } = require('./_core/version');
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

try {
    if (params.operation === 'install') {
        console.log('vendors install ----------');
        console.log('  branch :', params.branch);
        console.log('  mode   :', params.mode);
        console.log('  from   :', params.archPath);
        console.log('  to     :', params.distPath);
        console.log('--------------------------');

        if (!fs.existsSync(params.archPath)) {
            throw new Error(`Архив не найден: ${params.archPath}`);
        }

        if (!fs.existsSync(params.distPath)) {
            fs.mkdirSync(params.distPath, { recursive: true });
        }
        unzip(params.archPath, params.distPath);
    } else if (params.operation === 'update') {
        console.log('vendors update -----------');
        console.log('  branch :', params.branch);
        console.log('  mode   :', params.mode);
        console.log('  from   :', params.distPath);
        console.log('  to     :', params.archPath);
        console.log('--------------------------');
        renameWithDate(params.archPath);
        zip(
            path.join(params.distPath, 'vendor'),
            `${params.branch}.zip`,
            path.dirname(params.archPath),
        );
    } else if (params.operation === 'help' || params.operation === '?') {
        console.log(`vendors ${version()} help ---------------------------------------------`);
        console.log('полный список опций');
        console.log('  -o[opartion]   - тип операции update или install (default = update');
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
    } else {
        console.log(`vendors ${version()} --------------------------------------------------`);
        console.log('  branch     :', params.branch);
        console.log('  mode       :', params.mode);
        console.log('  distPath   :', params.distPath);
        console.log('  archPath   :', params.archPath);
        console.log('  projectName:', params.projectName);
        console.log('  projectPath:', params.projectPath);
        console.log('');
        console.log('  help        :', '$ node xxx/vendors -o ?');
        console.log('----------------------------------------------------------------');
    }
} catch (err) {
    console.error(`Ошибка: ${err.message}`);
    process.exit(1);
}
