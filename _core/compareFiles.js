const crypto = require('crypto');
const fs = require('fs');

function getHash(path) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('md5');
        const stream = fs.createReadStream(path);
        stream.on('data', (data) => hash.update(data));
        stream.on('end', () => resolve(hash.digest('hex')));
        stream.on('error', reject);
    });
}

async function compareFiles(file1, file2) {
    // Сначала проверяем размер — если он разный, файлы точно отличаются
    const stats1 = fs.statSync(file1);
    const stats2 = fs.statSync(file2);

    if (stats1.size !== stats2.size) return false;

    // Если размеры равны, считаем хеши
    const [hash1, hash2] = await Promise.all([getHash(file1), getHash(file2)]);
    return hash1 === hash2;
}

module.exports = { compareFiles };
