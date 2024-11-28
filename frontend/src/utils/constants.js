export const codeSmellTypes = [
    { type: 'Unused Variables', dataKey: 'unusedVariables', columns: ['File', 'Name', 'Line'] },
    { type: 'Spaghetti Code', dataKey: 'spaghettiCode', columns: ['File', 'Line', 'Nesting Level'] },
    { type: 'Inconsistent Naming', dataKey: 'inconsistentNaming', columns: ['File', 'Name', 'Line'] },
    { type: 'Long Functions', dataKey: 'longFunctions', columns: ['File', 'Line', 'Name', 'Length'] },
    { type: 'Excessive Parameters', dataKey: 'excessiveParameters', columns: ['File', 'Line', 'Name', 'Param Count'] },
    { type: 'God Object', dataKey: 'godObject', columns: ['File', 'Name', 'Line', 'Method Count'] },
];
