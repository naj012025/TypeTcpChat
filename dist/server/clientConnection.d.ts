import type { Socket } from "node:net";
export declare class ClientConnection {
    private readonly socket;
    userName: string | undefined;
    private readonly lineReader;
    constructor(socket: Socket);
    lines(): AsyncGenerator<string>;
    send(value: unknown): void;
    close(): void;
    destroy(): void;
}
//# sourceMappingURL=clientConnection.d.ts.map