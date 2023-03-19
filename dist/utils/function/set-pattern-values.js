"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPatternValues = void 0;
function setPatternValues(pattern, values) {
    const vars = pattern.matchAll(/\^(.*?)\$/g);
    for (const [maskedVariable, variable] of vars) {
        pattern = pattern.replace(maskedVariable, values[variable]);
    }
    return pattern;
}
exports.setPatternValues = setPatternValues;
//# sourceMappingURL=set-pattern-values.js.map