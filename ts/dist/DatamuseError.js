"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatamuseError = void 0;
class DatamuseError extends Error {
    isDatamuseError = true;
    sdk = 'Datamuse';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.DatamuseError = DatamuseError;
//# sourceMappingURL=DatamuseError.js.map