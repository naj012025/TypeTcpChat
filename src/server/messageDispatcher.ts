
import type { ChatMessage } from "../shared/messages.js";
import { ClientConnection } from "./clientConnection.js";

//point of this class it publicy sent info about joiners and leavers and public message or host message.
export class MessageDispatcher {
    public broadcast(
        //readonlyset reads all clients only and connect the message to the right person 
        //or hostbroadcast.
        clients: ReadonlySet<ClientConnection>,
        message: ChatMessage
    ): void {
        //similar to c# for clients in client 
        //this checks what clients makes or server and posts it.
        for (const client of clients) {
            client.send(message);
        }
    }

    public chat(
        clients: ReadonlySet<ClientConnection>,
        name: string,
        text: string
    ):  void {
        this.broadcast(clients, {
            type: "Chat",
            name,
            text,
            sentAt: new Date().toISOString()
            //toISOString is basicly DateTime.UtcNow 
            //iso is international organization for standardisation
            //so all program has a common time iso 8601.
        });
    }

    public joined(clients: ReadonlySet<ClientConnection>, name: string): void {
        this.broadcast(clients, {
            type: "Join",
            name,
            text: "${name} joined the chat.",
            sentAt: new Date().toISOString()
        });
    }

    public left(clients: ReadonlySet<ClientConnection>, name: string): void {
        this.broadcast(clients, {
            type: "Leave",
            name,
            text: "${name} left the chat.",
            sentAt: new Date().toISOString()
        });
    }
}