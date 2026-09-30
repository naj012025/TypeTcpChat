import type { Socket } from "node:net";
export declare function readLines(socket: Socket): AsyncGenerator<string>;
export declare class LineReader {
    private readonly iterator;
    constructor(socket: Socket);
    readLine(): Promise<string | undefined>;
    lines(): AsyncGenerator<string>;
}
export declare function writeJsonLine(socket: Socket, value: unknown): void;
//# sourceMappingURL=jsonLines.d.ts.map