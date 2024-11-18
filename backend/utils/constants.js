const maxFunctionLength = 100;
const paramsLimit = 3;
const nestingLimit = 3;
const classMethodLimit = 10;
const validNumbers = [0, 1, 200, 204, 201, 400, 401, 403, 404, 500]

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
    validNumbers
};


