const maxFunctionLength = 100;
const paramsLimit = 3;
const nestingLimit = 3;
const classMethodLimit = 10;
const maxFileLines = 500; 
const maxConditionComplexity = 5;

const camelCasePattern = /^[a-z][a-zA-Z0-9]*$/;
const snakeCasePattern = /^[a-z]+(_[a-z0-9]+)*$/;
const pascalCasePattern = /^[A-Z][a-zA-Z0-9]*$/;

module.exports = {
    maxFunctionLength,
    paramsLimit,
    camelCasePattern,
    snakeCasePattern,
    pascalCasePattern,
    nestingLimit,
    classMethodLimit,
    maxFileLines,
    maxConditionComplexity,
};


