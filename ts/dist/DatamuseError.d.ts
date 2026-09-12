import { Context } from './Context';
declare class DatamuseError extends Error {
    isDatamuseError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { DatamuseError };
