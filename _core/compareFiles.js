import { createHash } from 'crypto';
import { createReadStream, statSync } from 'fs';

function getHash(path) {
    return new Promise((resolve, reject) => {
        const hash = createHash('md5');
        const stream = createReadStream(path);
        stream.on('data', (data) => hash.update(data));
        stream.on('end', () => resolve(hash.digest('hex')));
        stream.on('error', reject);
    });
}

async function compareFiles(file1, file2) {
    // Сначала проверяем размер — если он разный, файлы точно отличаются
    const stats1 = statSync(file1);
    const stats2 = statSync(file2);

    if (stats1.size !== stats2.size) return false;

    // Если размеры равны, считаем хеши
    const [hash1, hash2] = await Promise.all([getHash(file1), getHash(file2)]);
    return hash1 === hash2;
}

export default compareFiles;
