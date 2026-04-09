const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

async function zip(sourceDir, outName, targetDir) {
    // Формируем пути (автоматически подстраиваются под Win/Linux)
    const tempZipPath = path.join(__dirname, outName);
    const finalZipPath = path.join(targetDir, outName);

    // 1. Создаем поток для записи архива во временный файл
    const output = fs.createWriteStream(tempZipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    return new Promise((resolve, reject) => {
        output.on('close', async () => {
            console.log(`Архив создан: ${archive.pointer()} байт`);

            try {
                // 2. Создаем целевую папку, если её нет
                if (!fs.existsSync(targetDir)) {
                    fs.mkdirSync(targetDir, { recursive: true });
                }
                // 3. Перемещаем файл
                fs.renameSync(tempZipPath, finalZipPath);
                // console.log(`Архив успешно перемещен в: ${finalZipPath}`);

                resolve(finalZipPath);
            } catch (err) {
                reject(err);
            }
        });

        archive.on('error', (err) => reject(err));

        // Направляем данные архива в файл
        archive.pipe(output);

        // Добавляем содержимое папки в архив
        // Второй аргумент false означает, что файлы будут в корне архива,
        // а не внутри подпапки с именем sourceDir
        archive.directory(sourceDir, path.basename(sourceDir));

        // Финализируем архив
        archive.finalize();
    });
}

module.exports = {
    zip,
};
