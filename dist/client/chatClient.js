import { createConnection } from "node:net";
import { LineReader, writeJsonLine } from "../shared/jsonLines.js";
import { consoleInput } from "./consoleInput.js";
export class ChatClient {
    socket;
    async start(host, port) {
        this.socket = await this.connect(host, port);
        const lineReader = new LineReader(this.socket);
        const authenticated = await this.authenticate(this.socket, lineReader);
        if (!authenticated) {
            this.socket.end();
            return;
        }
        const receiveTask = this.receiveLoop(lineReader);
        const sendTask = this.sendLoop(this.socket);
        await Promise.race([receiveTask, sendTask]);
        this.socket.end();
    }
    connect(host, port) {
        return new Promise((resolve, reject) => {
            const socket = createConnection({ host, port });
            socket.once("connect", () => resolve(socket));
            socket.once("error", reject);
        });
    }
    async authenticate(socket, lineReader) {
        console.log("1. Login");
        console.log("2. Register");
        const choice = await consoleInput.question("Choice: ");
        const userName = await consoleInput.question("Username: ");
        const password = await consoleInput.question("Password: ");
        const request = {
            type: choice === "2" ? "Register" : "Login",
            userName,
            password
        };
        writeJsonLine(socket, request);
        const line = await lineReader.readLine();
        if (line === undefined)
            return false;
        const response = JSON.parse(line);
        console.log(response.message);
        return response.success;
    }
    async receiveLoop(lineReader) {
        for await (const line of lineReader.lines()) {
            const message = JSON.parse(line);
            const time = new Date(message.sentAt).toLocaleTimeString();
            switch (message.type) {
                case "Join":
                case "Leave":
                    console.log(`[${time}] *** ${message.text}`);
                    break;
                case "Chat":
                    console.log(`[${time}] ${message.name}: ${message.text}`);
                    break;
            }
        }
    }
    async sendLoop(socket) {
        while (!socket.destroyed) {
            const text = await consoleInput.question("");
            if (text.trim().toLowerCase() === "/quit") {
                return;
            }
            if (text.trim().length === 0) {
                continue;
            }
            writeJsonLine(socket, { type: "Chat", text });
        }
    }
}
//# sourceMappingURL=chatClient.js.map