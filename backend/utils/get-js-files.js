const path = require('path');
const fs = require('fs');

function getJsFilesInDirectory(dir) {
    let jsFiles = [];

    try {
        const stat = fs.statSync(dir);

        if (stat.isFile() && path.extname(dir) === '.js') {
            // If the path is a file and has a .js extension, add it to the array
            jsFiles.push(dir);
        } else if (stat.isDirectory()) {
            // If the path is a directory, read the files in it
            const files = fs.readdirSync(dir);

            files.forEach(file => {
                const fullPath = path.join(dir, file);
                let fileStat;

                try {
                    fileStat = fs.statSync(fullPath);
                } catch (error) {
                    console.log(`Skipping file or directory due to error: ${fullPath}`);
                    return; // Skip this file or directory
                }

                // Exclude node_modules directory
                if (fileStat.isDirectory() && file !== 'node_modules') {
                    jsFiles = jsFiles.concat(getJsFilesInDirectory(fullPath)); // Recursively read subdirectories
                } else if (fileStat.isFile() && path.extname(fullPath) === '.js') {
                    jsFiles.push(fullPath);
                }
            });
        }
    } catch (error) {
        console.error(`Error reading directory or file ${dir}:`, error);
        throw error;
    }
    return jsFiles;
}

module.exports = { getJsFilesInDirectory }