const fs = require('fs');
const path = require('path');

/**
 * Переименовывает файл, добавляя дату в формате _ddmmyy
 * @param {string} fullPath - Полный или относительный путь к файлу
 */
function renameWithDate(fullPath) {
    if (fs.existsSync(fullPath)) {
        const now = new Date();

        // Форматируем компоненты даты
        const dd = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const yy = String(now.getFullYear()).slice(-2);

        const dateStr = `${dd}${mm}${yy}`;

        // Разбираем путь: директория, имя без расширения, само расширение
        const dir = path.dirname(fullPath);
        const ext = path.extname(fullPath);
        const name = path.basename(fullPath, ext);

        const newName = `${name}_${dateStr}${ext}`;
        const newPath = path.join(dir, newName);

        try {
            if (!fs.existsSync(newPath)) {
                fs.renameSync(fullPath, newPath);
                return newPath;
                // console.log(`Успешно: ${path.basename(fullPath)} -> ${newName}`);
            }
            console.log(`${newPath} уже существует, не пересоздаю`);

            // return newPath; // Возвращаем новый путь для дальнейшей работы
        } catch (err) {
            console.error(`Ошибка при переименовании: ${err.message}`);
            throw err;
        }
    }
    return false;
}

module.exports = {
    renameWithDate,
};
