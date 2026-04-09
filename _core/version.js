import { execSync } from 'child_process';
import { dirname } from 'path';
import define from './define.js';

function version() {
    try {
        // Получаем последний тег
        const cwd = dirname(define.require_main_filename);
        const tag = execSync('git describe --tags --abbrev=0', { cwd }).toString().trim();
        return tag;
    } catch (error) {
        console.error('Ошибка при получении тега (возможно, тегов нет):', error.message);
    }
    return '';
}

export default version;
