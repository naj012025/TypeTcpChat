// OBS socket.write()` sends bytes. `readLines()` creates messages. TCP itself does not know JSON,
//ChatMessage, LoginRequest or newline framing.

import type {Socket} from "node:net";
//had a issue here on from becuase i forgott to add in "node" in types at tsconfig.json .

//the * means the function can have multiple results in it.
//Generators uses yield. it is the only place for it in ts.
export async function* readLines(socket: Socket): AsyncGenerator<string> {
        let buffer = "";
        //Reminder never assume it sends it complete
        //Sockets are the same ish as StreamReader in c#. chunks of bytes it can send random data for example: a partial json object or multible.
    for await (const chunk of socket) {
        buffer += chunk.toString("utf8");
        
        let newLineIndex = buffer.indexOf("\n");
        
        while (newLineIndex >= 0) {
            //slice cuts out the newline but gives the whole line of text from json.
            const line = buffer.slice(0, newLineIndex).trimEnd();
            //gives the next part of the message by removing the first part of the message.
            //Removes the just completed message +\n from buffer.
            buffer = buffer.slice(newLineIndex +1);

            if(line.length > 0) {
            //this is generator from top comment.
            yield line;
            
                }
            newLineIndex = buffer.indexOf("\n");
        }
    }
}

//This is basicly Streamreader from dotnet just have to make it in ts.
export class LineReader {
    private readonly iterator: AsyncIterator<string>;
    
    public constructor(socket: Socket){
        this.iterator = readLines(socket)[Symbol.asyncIterator]();
    }

    public async readLine(): Promise<string | undefined> {
        const result = await this.iterator.next();
        return result.done ? undefined : result.value;
    }

    public async *lines(): AsyncGenerator<string> {
        while(true) {
            const line = await this.readLine();
            if(line === undefined)return;
            yield line;
        }
    }
}
export function writeJsonLine(socket: Socket, value: unknown): void {
    socket.write(JSON.stringify(value) + "\n");
}