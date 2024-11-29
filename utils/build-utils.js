const fs = require('fs-extra');
const path = require('path');

function trimSrc(path) {
    const prefix = 'src/';
    if (path.startsWith(prefix)) {
        return path.slice(prefix.length);
    }
    return path;
}

export function copySrcFolder(name) {

    const subdir = trimSrc(name);
    const dest = path.resolve(__dirname, `../dist/${subdir}`);

    fs.ensureDirSync(dest);
    fs.copySync(name, dest);
}

export function copySrcFile(name, newName = null) {
    const subpath = trimSrc(name);

    // If newName is provided, use it; otherwise, keep the original file name
    const fileName = newName ? newName : path.basename(subpath);
    const dest = path.resolve(__dirname, `../dist/${path.dirname(subpath)}/${fileName}`);

    // Ensure the parent directory of the destination file exists
    fs.ensureDirSync(path.dirname(dest));

    // Copy the file to the destination
    fs.copyFile(name, dest, (err) => {
        if (err) {
            console.error(`Failed to copy file: ${err}`);
        } else {
            console.log(`File copied to ${dest}`);
        }
    });
}

export function copyDistToWindowsAppdata(moduleName) {
    const modulesPath = path.join(process.env.LOCALAPPDATA, `/FoundryVTT/Data/modules/${moduleName}`);
    fs.ensureDirSync(modulesPath);
    const srcDir = path.resolve(__dirname, '../dist');
    fs.copySync(srcDir, modulesPath);
    console.log('Module files copied to:', modulesPath);
}
