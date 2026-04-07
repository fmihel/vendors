const { execSync } = require('child_process');

function branches(param = '') {
    const cwd = process.cwd();
    const stdout = execSync(`git branch${(param ? ` ${param}` : '')}`, { cwd, encoding: 'utf8' });
    return stdout
        .split('\n')
        .map((branch) => branch.replace(/[\*\s]/g, '')) // Убираем "*" (индикатор текущей ветки) и пробелы
        .filter(Boolean); // Удаляем пустые строки
}

module.exports = { branches };
