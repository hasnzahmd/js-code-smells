export const codeSmellTypes = [
    { type: 'Unused Variables', dataKey: 'unusedVariables', columns: ['File', 'Name', 'Line'], description: 'Variables that are declared but never used in the code' },
    { type: 'Spaghetti Code', dataKey: 'spaghettiCode', columns: ['File', 'Line', 'Nesting Level'], description: 'Code with a complex and tangled control structure, making it hard to follow' },
    { type: 'Inconsistent Naming', dataKey: 'inconsistentNaming', columns: ['File', 'Name', 'Line'], description: 'Variables or functions that do not follow consistent naming conventions' },
    { type: 'Long Functions', dataKey: 'longFunctions', columns: ['File', 'Line', 'Name', 'Length'], description: 'Functions that are excessively long and complex, making them hard to understand and maintain' },
    { type: 'Excessive Parameters', dataKey: 'excessiveParameters', columns: ['File', 'Line', 'Name', 'Param Count'], description: 'Functions that take too many parameters, which can make them difficult to use and test' },
    { type: 'God Object', dataKey: 'godObject', columns: ['File', 'Name', 'Line', 'Method Count'], description: 'Objects that have too many responsibilities, making them difficult to manage and understand' },
    { type: 'Magic Numbers', dataKey: 'magicNumbers', columns: ['File', 'Line', 'Value'], description: 'Use of numeric literals without explanation, making the code hard to understand' },
    { type: 'Empty Blocks', dataKey: 'emptyBlocks', columns: ['File', 'Line'], description: 'Code blocks that are empty and serve no purpose' },
    { type: 'Complex Conditions', dataKey: 'complexConditions', columns: ['File', 'Line', 'Complexity'], description: 'Conditions that are overly complex, making the code hard to read and maintain' },
    { type: 'Deep Inheritance', dataKey: 'deepInheritance', columns: ['File', 'Name', 'Line', 'Depth'], description: 'Inheritance hierarchies that are too deep, making the code hard to understand and maintain' },
    { type: 'Commented-Out Code', dataKey: 'commentedOutCode', columns: ['File', 'Line', 'Comment'], description: 'Code that is commented out and should be removed if not needed' },
    { type: 'Large Files', dataKey: 'largeFiles', columns: ['File', 'Line Count'], description: 'Files that are too large, making them difficult to navigate and understand' },
];
