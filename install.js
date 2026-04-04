const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const {unzip} = require('./src/unzip');

const {
    projectPath,
    projectName,
    mode,
    distPath,
    branch,
    archPath
} = require('./src/params');

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


try {


    console.log('install -----------------');
    console.log('branch :',branch);
    console.log('mode   :',mode);
    console.log('from   :',archPath);
    console.log('to     :',distPath);
    console.log('--------------------------');

    
    if (!fs.existsSync(archPath)) {
        throw new Error(`Архив не найден: ${archPath}`);
    }

    if (!fs.existsSync(distPath)) {
         fs.mkdirSync(distPath, { recursive: true });
    }

    unzip(archPath,distPath);
   

} catch (err) {
    console.error(`Ошибка: ${err.message}`);
    process.exit(1);
}
