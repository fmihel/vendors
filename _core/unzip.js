import { execSync } from 'child_process';

function unzip(archPath, distPath) {
    if (process.platform === 'win32') {
        // Windows PowerShell
        execSync(`powershell -Command "Expand-Archive -Path '${archPath}' -DestinationPath '${distPath}' -Force"`);
    } else {
        // Linux / macOS
        execSync(`unzip -o "${archPath}" -d "${distPath}"`);
    }
}

export default unzip;
