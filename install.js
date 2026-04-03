const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
/**
 * устанавливаем сохраненные архивы
 * Ex: автоопределение ветки и пути к архиву ( архивы лежат тамже где и скрипты )
 * $ node /../../install  
 * Ex: установка др ветки
 * $ node /../../install -branch beta
 * 
 * параметры
 * -p[roject]       маршрут к проекту ( по умолчанию там где запускаем install)
 * -n[ame]          имя проекта (папка в корневой папке архива)
 * -a[rch]          путь к архиву ( если задать, то след парметры будут игнориться)
 * -b[ranche]       ветка (архив называется по имени веткиы)
 * -m[ode]          режим установки ( prod или dev)
 */


/**
 * Возврращает поименованные аргументы командной строки
 * 
 * @returns object
 */
function getArgs() {
    const args = {};
    const rawArgs = process.argv.slice(2);

    for (let i = 0; i < rawArgs.length; i++) {
        const arg = rawArgs[i];
        
        // Если нашли ключ (начинается с -)
        if (arg.startsWith('-')) {
            const key = arg.slice(1); // убираем дефис
            const nextValue = rawArgs[i + 1];

            // Если следующее значение существует и не является новым ключом
            if (nextValue && !nextValue.startsWith('-')) {
                args[key] = nextValue;
                i++; // Пропускаем значение, так как мы его уже забрали
            } else {
                args[key] = true; // Для флагов без значения
            }
        }
    }
    return args;
}
const args = getArgs();

const p = args['project'] ? args['project'] : args['p'];
const projectPath = p ? p : process.cwd(); // маршрут к проекту

const pn = args['name'] ? args['name'] : args['n'];
const projectName = pn ? pn : path.basename(projectPath); // имя пректа

const d = args['dist'] ? args['dist'] : args['d'];
const distPath = d ? d  : path.join(projectPath, 'dist'); // маршрут куда распаковать



try {

    const a = args['arch'] ? args['arch'] : args['a']; 
    let archPath; // путь к папке 
    let branch;
    let mode = 'prod';
    if (a){

        archPath = a;
        branch  = path.basename(archPath);

    }else{
        
        const b = args['branch'] ? args['branch'] : args['b']; 
        if (b){
            branch = b;
        }else{
            // // 1. Получаем имя текущей ветки Git
            branch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: projectPath })
                .toString()
                .trim();
        }

        const m = args['mode'] ? args['mode'] : args['m']; 
        mode = m ? m : 'prod';
        archPath = path.join(__dirname,projectName,mode,branch+'.zip');
        if (!fs.existsSync(archPath)) {
            ['main','master'].find(br=>{
                const other =path.join(__dirname,projectName,mode,br+'.zip'); 
                if (fs.existsSync(other)) {
                    archPath = other;
                    return true;
                }
            })
        }
    }

    
    if (!fs.existsSync(archPath)) {
        throw new Error(`Архив не найден: ${archPath}`);
    }

    if (!fs.existsSync(distPath)) {
         fs.mkdirSync(distPath, { recursive: true });
    }


    console.log('install -----------------');
    console.log('branch :',branch);
    console.log('mode   :',mode);
    console.log('from   :',archPath);
    console.log('to     :',distPath);
    console.log('--------------------------');


   
    if (process.platform === 'win32') {
        // Windows PowerShell
        execSync(`powershell -Command "Expand-Archive -Path '${archPath}' -DestinationPath '${distPath}' -Force"`);
    } else {
        // Linux / macOS
        execSync(`unzip -o "${archPath}" -d "${distPath}"`);
    }


} catch (err) {
    console.error(`Ошибка: ${err.message}`);
    process.exit(1);
}
