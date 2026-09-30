import type { ChatMessage } from "../shared/messages.js";
import { ClientConnection } from "./clientConnection.js";
export declare class MessageDispatcher {
    broadcast(clients: ReadonlySet<ClientConnection>, message: ChatMessage): void;
    chat(clients: ReadonlySet<ClientConnection>, name: string, text: string): void;
    joined(clients: ReadonlySet<ClientConnection>, name: string): void;
    left(clients: ReadonlySet<ClientConnection>, name: string): void;
}
//# sourceMappingURL=messageDispatcher.d.ts.map