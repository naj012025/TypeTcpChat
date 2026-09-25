
import type {Socket} from "node:net";
import {LineReader, writeJsonLine} from "../shared/jsonLines.js"

export class ClientConnection {
    public userName: string | undefined;
    private readonly lineReader: LineReader;

    //Line 11: made line 7 initialzed.
    public constructor (private readonly socket: Socket) {
       this.lineReader = new LineReader(socket);
    }

    public lines(): AsyncGenerator<string> {
        return this.lineReader.lines();
    }

    public send(value: unknown): void {
        writeJsonLine(this.socket, value)
    }
    //gravefull closing.
    public close(): void {
        this.socket.end();
    }
    //destroy is mostly used in tcp it nukes the socket if something went wrong
    //and close does not work. 
    public destroy(): void {
        this.socket.destroy();
    }

}