const { findCodeSmells } = require('./find-code-smells');
const { getJsFilesInDirectory } = require('./get-js-files');

// Main function which gets all the JS files in a directory and finds code smells in them
function detectCodeSmells(directory) {
    try {
        const jsFiles = getJsFilesInDirectory(directory);
        console.log('Files count:', jsFiles.length);

        // Object to store all code smells found in the project
        const codeSmells = {
            files_read: 0,
            longFunctions: [],
            unusedVariables: [],
            inconsistentNaming: [],
            excessiveParameters: [],
            spaghettiCode: [],
            godObject: []
        };

        jsFiles.forEach(async file => {
            await findCodeSmells(directory, file, codeSmells);
        });

        console.log('Files read:', codeSmells.files_read)
        return codeSmells;

    } catch (error) {
        console.error(`Error checking project in directory ${directory}:`, error);
        if (error.code === 'ENOENT') {
            throw new Error('File or directory does not exist');
        }
    }
}

module.exports = { detectCodeSmells }