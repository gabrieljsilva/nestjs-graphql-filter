"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GraphqlFilterModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphqlFilterModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_filter_service_1 = require("./graphql-filter.service");
const types_1 = require("../../types");
let GraphqlFilterModule = GraphqlFilterModule_1 = class GraphqlFilterModule {
    static forRoot(adapter) {
        return {
            module: GraphqlFilterModule_1,
            imports: [],
            providers: [
                graphql_filter_service_1.GraphqlFilterService,
                {
                    provide: types_1.GraphqlFilterAdapter,
                    useClass: adapter,
                },
            ],
            exports: [graphql_filter_service_1.GraphqlFilterService],
            global: true,
        };
    }
    static forFeature(adapter) {
        return {
            module: GraphqlFilterModule_1,
            imports: [],
            providers: [
                graphql_filter_service_1.GraphqlFilterService,
                {
                    provide: types_1.GraphqlFilterAdapter,
                    useClass: adapter,
                },
            ],
            exports: [graphql_filter_service_1.GraphqlFilterService],
        };
    }
};
GraphqlFilterModule = GraphqlFilterModule_1 = __decorate([
    (0, common_1.Module)({})
], GraphqlFilterModule);
exports.GraphqlFilterModule = GraphqlFilterModule;
//# sourceMappingURL=graphql-filter.module.js.map