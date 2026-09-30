import { AuthenticationService } from "./authenticationService.js";
import { MessageDispatcher } from "./messageDispatcher.js";
export declare class ChatServer {
    private readonly authService;
    private readonly dispatcher;
    private readonly clients;
    private readonly server;
    constructor(authService: AuthenticationService, dispatcher: MessageDispatcher);
    start(port: number, host?: string): void;
    private handleClient;
    private asAuthRequest;
    private asChatSendRequest;
}
//# sourceMappingURL=chatServer.d.ts.map