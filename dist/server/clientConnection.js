import { LineReader, writeJsonLine } from "../shared/jsonLines.js";
export class ClientConnection {
    socket;
    userName;
    lineReader;
    //Line 11: made line 7 initialzed.
    constructor(socket) {
        this.socket = socket;
        this.lineReader = new LineReader(socket);
    }
    lines() {
        return this.lineReader.lines();
    }
    send(value) {
        writeJsonLine(this.socket, value);
    }
    //gravefull closing.
    close() {
        this.socket.end();
    }
    //destroy is mostly used in tcp it nukes the socket if something went wrong
    //and close does not work. 
    destroy() {
        this.socket.destroy();
    }
}
//# sourceMappingURL=clientConnection.js.map