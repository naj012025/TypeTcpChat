import { createServer } from "node:net";
import { ClientConnection } from "./clientConnection.js";
import { AuthenticationService } from "./authenticationService.js";
import { MessageDispatcher } from "./messageDispatcher.js";
export class ChatServer {
    authService;
    dispatcher;
    clients = new Set();
    server;
    constructor(authService, dispatcher) {
        this.authService = authService;
        this.dispatcher = dispatcher;
        this.server = createServer(socket => {
            void this.handleClient(socket);
        });
    }
    //the () => means this function takes 0 parameters.
    //  not run this block of code that i thought.
    start(port, host = "0.0.0.0") {
        this.server.listen(port, host, () => {
            console.log("server listening on $(host):$(port)");
        });
    }
    async handleClient(socket) {
        const connection = new ClientConnection(socket);
        let authenticated = false;
        //or each complete line that asynchronously arrives from this client's TCP 
        // connection, put it in line and execute the code inside { }.
        try {
            for await (const line of connection.lines()) {
                const parsed = JSON.parse(line);
                if (!authenticated) {
                    const request = this.asAuthRequest(parsed);
                    if (!request) {
                        connection.send({
                            type: "AuthResponse",
                            success: false,
                            message: "Expected Login or Register request."
                        });
                        continue;
                    }
                    connection.userName = request.userName;
                    authenticated = true;
                    this.clients.add(connection);
                    this.dispatcher.joined(this.clients, request.userName);
                    continue;
                }
                const chat = this.asChatSendRequest(parsed);
                if (!chat || !connection.userName) {
                    continue;
                }
                this.dispatcher.chat(this.clients, connection.userName, chat.text);
            }
        }
        catch (error) {
            console.error("client connection failed:", error);
        }
        finally {
            if (this.clients.delete(connection) && connection.userName) {
                this.dispatcher.left(this.clients, connection.userName);
            }
            connection.destroy();
        }
    }
    asAuthRequest(value) {
        if (!value || typeof value !== "object")
            return undefined;
        const v = value;
        if ((v.type === "Login" || v.type === "Register") &&
            typeof v.userName === "string" &&
            typeof v.password === "string") {
            return v;
        }
        return undefined;
    }
    asChatSendRequest(value) {
        if (!value || typeof value !== "object")
            return undefined;
        const v = value;
        return v.type === "Chat" && typeof v.text === "string"
            ? v
            : undefined;
    }
}
//# sourceMappingURL=chatServer.js.map