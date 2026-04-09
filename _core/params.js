import {
    basename, join, dirname, resolve,
} from 'path';
import { execSync } from 'child_process';
import args from './args.js';
import define from './define.js';

const o = args.operation ? args.operation : args.o;
const operation = o || 'info'; // тип действия update || install || info || help || ?

const p = args.project ? args.project : args.p;
const projectPath = p || process.cwd(); // маршрут к текущему проекту

const pn = args.name ? args.name : args.n;
const projectName = pn || basename(projectPath); // имя проекта в архиве

const m = args.mode ? args.mode : args.m;
const mode = m || 'prod'; // режим создания проекта

let distPath;
if (mode === 'prod') {
    const d = args.dist ? args.dist : args.d;
    distPath = d || join(projectPath, 'dist'); // маршрут куда распаковать
} else {
    distPath = projectPath;
}

const a = args.arch ? args.arch : args.a;
let archPath; // путь к папке
let branch;

if (a) {
    archPath = a;
    branch = basename(archPath);
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

    const namedir = dirname(define.require_main_filename);

    archPath = resolve(join(namedir, projectName, mode, `${branch}.zip`));
    if (operation === 'install') {
        // if (!fs.existsSync(archPath)) {
        // ['main', 'master'].find((br) => {
        //     const other = path.resolve(path.join(dirname, projectName, mode, `${br}.zip`));
        //     if (fs.existsSync(other)) {
        //         archPath = other;
        //         return true;
        //     }
        // });
        // }
    }
}

export default {
    projectPath,
    projectName,
    mode,
    distPath,
    branch,
    archPath,
    operation,
};
