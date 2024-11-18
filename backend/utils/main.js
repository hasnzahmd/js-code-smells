const { readFilesInDirectory, detectCodeSmells } = require('./helper_functions');

// Main function to check all JavaScript files in a project
function checkProject(directory) {
    try {
        const jsFiles = readFilesInDirectory(directory);

        const codeSmells = {
            longFunctions: [],
            magicNumbers: [],
            unusedVariables: [],
            inconsistentNaming: [],
            excessiveParameters: [],
            spaghettiCode: [],
            godObject: []
        };

        jsFiles.forEach(async file => {
            await detectCodeSmells(directory, file, codeSmells);
        });

        return codeSmells;

    } catch (error) {
        console.error(`Error checking project in directory ${directory}:`, error);
        if (error.code === 'ENOENT') {
            throw new Error('File or directory does not exist');
        }
    }
}

module.exports = { checkProject }