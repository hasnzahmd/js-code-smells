export const codeSmellTypes = [
    { type: 'Unused Variables', dataKey: 'unusedVariables', columns: ['File', 'Name', 'Line'] },
    { type: 'Spaghetti Code', dataKey: 'spaghettiCode', columns: ['File', 'Line', 'Nesting Level'] },
    { type: 'Inconsistent Naming', dataKey: 'inconsistentNaming', columns: ['File', 'Name', 'Line'] },
    { type: 'Long Functions', dataKey: 'longFunctions', columns: ['File', 'Line', 'Name', 'Length'] },
    { type: 'Excessive Parameters', dataKey: 'excessiveParameters', columns: ['File', 'Line', 'Name', 'Param Count'] },
    { type: 'God Object', dataKey: 'godObject', columns: ['File', 'Name', 'Line', 'Method Count'] },
    { type: 'Magic Numbers', dataKey: 'magicNumbers', columns: ['File', 'Line', 'Value'] },
    { type: 'Empty Blocks', dataKey: 'emptyBlocks', columns: ['File', 'Line'] },
    { type: 'Complex Conditions', dataKey: 'complexConditions', columns: ['File', 'Line', 'Complexity'] },
    { type: 'Deep Inheritance', dataKey: 'deepInheritance', columns: ['File', 'Name', 'Line', 'Depth'] },
    { type: 'Commented-Out Code', dataKey: 'commentedOutCode', columns: ['File', 'Line', 'Comment'] },
    { type: 'Large Files', dataKey: 'largeFiles', columns: ['File', 'Line Count'] },
];
