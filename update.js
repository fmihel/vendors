const fs = require('fs');
const path = require('path');
const {zip }= require('./src/zip');
const { execSync } = require('child_process');
const {
    projectPath,
    projectName,
    mode,
    distPath,
    branch,
    archPath
} = require('./src/params');
const archiver = require('archiver');
const { renameWithDate } = require('./src/renameWithDate');


try {
    
    renameWithDate(archPath);
    zip(
        path.join(distPath,'vendor'),
        branch+'.zip',
        path.dirname(archPath)
    );


} catch (err) {
    console.error(`Ошибка: ${err.message}`);
    process.exit(1);
}
