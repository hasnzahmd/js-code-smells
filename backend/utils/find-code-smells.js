const fs = require('fs');
const acorn = require('acorn');
const walk = require("acorn-walk");
const { 
    maxFunctionLength, 
    paramsLimit, 
    camelCasePattern, 
    snakeCasePattern, 
    pascalCasePattern, 
    nestingLimit, 
    classMethodLimit, 
} = require('./constants');

function getDifference(str1, str2) {
    if (str2.startsWith(str1)) {
        return str2.slice(str1.length);
    }
    return '';
}

// Function to find code smells
async function findCodeSmells(directory, file, codeSmells) {   
    try{
        const code = fs.readFileSync(file, 'utf8');
        let ast;
        try {
            ast = acorn.parse(code, { ecmaVersion: 2021, sourceType: "module", locations: true });
        } catch (error) {
            return
        }
        codeSmells.files_read += 1;
        const filePath = getDifference(directory, file);
        
        // Variable usage tracking
        let declaredVariables = new Set();
        let usedVariables = new Set();

        walk.ancestor(ast, {
            FunctionDeclaration(node) {
                // Detect long functions
                const functionLength = node.loc.end.line - node.loc.start.line;
                if (functionLength > maxFunctionLength) {
                    codeSmells.longFunctions.push({
                        file: filePath,
                        line: node.loc.start.line,
                        name: node.id?.name,
                        length: functionLength
                    });
                }

                // Detect excessive function parameters
                if (node.params.length > paramsLimit) {
                    codeSmells.excessiveParameters.push({
                        file: filePath,
                        line: node.loc.start.line,
                        name: node.id?.name,
                        paramCount: node.params.length
                    });
                }
            },
            ArrowFunctionExpression(node, ancestors) {
                const functionLength = node.loc.end.line - node.loc.start.line;
                let functionName = '(arrow function)';

                const parent = ancestors[ancestors.length - 2]; // The immediate parent node

                if (parent.type === 'VariableDeclarator' && parent.id && parent.id.name)
                    functionName = parent.id.name;

                else if (parent.type === 'CallExpression' && parent.callee && parent.callee.property)
                    functionName = parent.callee.property.name;

                else if (parent.type === 'Property' && parent.key && parent.key.name)
                    functionName = parent.key.name;

                // Detect long arrow functions
                if (functionLength > maxFunctionLength) {
                    codeSmells.longFunctions.push({
                        file: filePath,
                        line: node.loc.start.line,
                        name: functionName,
                        length: functionLength
                    });
                }

                // Detect excessive function parameters
                if (node.params.length > paramsLimit) {
                    codeSmells.excessiveParameters.push({
                        file: filePath,
                        line: node.loc.start.line,
                        name: functionName,
                        paramCount: node.params.length
                    });
                }
            },
            Literal(node) {

            },
            VariableDeclaration(node, ancestors) {
                node.declarations.forEach(declaration => {
                    if (!declaration.id.name) return;

                    // Track declared variables
                    declaredVariables.add({ filePath, name: declaration.id.name, line: declaration.id.loc.start.line });

                    const isCamelCase = camelCasePattern.test(declaration.id.name);
                    const isSnakeCase = snakeCasePattern.test(declaration.id.name);
                    const isPascalCase = pascalCasePattern.test(declaration.id.name);

                    // Detect inconsistent variable naming
                    // Flag if the name doesn't match camelCase, snake_case, or PascalCase
                    if (!isCamelCase && !isSnakeCase && !isPascalCase) {
                        codeSmells.inconsistentNaming.push({
                            file: filePath,
                            name: declaration.id.name,
                            line: declaration.id.loc.start.line
                        });
                    }
                });
            },
            IfStatement(node, ancestors) {
                // Detect spaghetti code (excessive nesting)
                const currentNesting = ancestors.filter(ancestor => ancestor.type === 'IfStatement').length;
                if (currentNesting > nestingLimit) {
                    codeSmells.spaghettiCode.push({
                        file: filePath,
                        line: node.loc.start.line,
                        nestingLevel: currentNesting
                    });
                }
            },
            ClassDeclaration(node) {
                // Detect God objects (classes with many methods)
                if (node.body.body.length > classMethodLimit) {
                    codeSmells.godObject.push({
                        file: filePath,
                        name: node.id.name,
                        line: node.loc.start.line,
                        methodCount: node.body.body.length
                    });
                }
            },
            Identifier(node) {
                // Track used variables
                usedVariables.add({ filePath, name: node.name, line: node.loc.start.line });
            },
        });

        // Unused variable detection (declared but not used)
        declaredVariables.forEach(variable => {
            const isUsed = Array.from(usedVariables).some(usedVar => usedVar.name === variable.name);
            if (!isUsed) {
                codeSmells.unusedVariables.push({
                    file: variable.filePath,
                    name: variable.name,
                    line: variable.line
                });
            }
        });

        return codeSmells;
    } catch (error) {
        console.error(`Error reading file ${file}:`, error.message);
    }
}

module.exports = { findCodeSmells };
