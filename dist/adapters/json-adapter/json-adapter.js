"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonAdapter = void 0;
const types_1 = require("../../types");
class JsonAdapter extends types_1.GraphqlFilterAdapter {
    getQuery(filter) {
        return filter;
    }
}
exports.JsonAdapter = JsonAdapter;
//# sourceMappingURL=json-adapter.js.map