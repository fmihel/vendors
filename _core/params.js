const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { args } = require('./args');

const o = args.operation ? args.operation : args.o;
const operation = o || 'update'; // тип действия update || install

const p = args.project ? args.project : args.p;
const projectPath = p || process.cwd(); // маршрут к текущему проекту

const pn = args.name ? args.name : args.n;
const projectName = pn || path.basename(projectPath); // имя проекта в архиве

const m = args.mode ? args.mode : args.m;
const mode = m || 'prod'; // режим создания проекта

let distPath;
if (mode === 'prod') {
    const d = args.dist ? args.dist : args.d;
    distPath = d || path.join(projectPath, 'dist'); // маршрут куда распаковать
} else {
    distPath = projectPath;
}

const a = args.arch ? args.arch : args.a;
let archPath; // путь к папке
let branch;

if (a) {
    archPath = a;
    branch = path.basename(archPath);
} else {
    const b = args.branch ? args.branch : args.b;
    if (b) {
        branch = b;
    } else {
        // 1. Получаем имя текущей ветки Git
        branch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: projectPath })
            .toString()
            .trim();
    }

    const dirname = path.dirname(require.main.filename);

    archPath = path.resolve(path.join(dirname, projectName, mode, `${branch}.zip`));
    if (operation === 'install') {
        if (!fs.existsSync(archPath)) {
        // eslint-disable-next-line array-callback-return, consistent-return
            ['main', 'master'].find((br) => {
                const other = path.resolve(path.join(dirname, projectName, mode, `${br}.zip`));
                if (fs.existsSync(other)) {
                    archPath = other;
                    return true;
                }
            });
        }
    }
}

module.exports = {
    projectPath,
    projectName,
    mode,
    distPath,
    branch,
    archPath,
    operation,
};
