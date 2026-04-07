const { execSync } = require('child_process');
const path = require('path');

function version() {
    try {
        // Получаем последний тег
        const cwd = path.dirname(require.main.filename);
        const tag = execSync('git describe --tags --abbrev=0', { cwd }).toString().trim();
        return tag;
    } catch (error) {
        console.error('Ошибка при получении тега (возможно, тегов нет):', error.message);
    }
    return '';
}

module.exports = {
    version,
};
