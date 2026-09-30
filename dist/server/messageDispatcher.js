import { ClientConnection } from "./clientConnection.js";
//point of this class it publicy sent info about joiners and leavers and public message or host message.
export class MessageDispatcher {
    broadcast(
    //readonlyset reads all clients only and connect the message to the right person 
    //or hostbroadcast.
    clients, message) {
        //similar to c# for clients in client 
        //this checks what clients makes or server and posts it.
        for (const client of clients) {
            client.send(message);
        }
    }
    chat(clients, name, text) {
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
    joined(clients, name) {
        this.broadcast(clients, {
            type: "Join",
            name,
            text: "${name} joined the chat.",
            sentAt: new Date().toISOString()
        });
    }
    left(clients, name) {
        this.broadcast(clients, {
            type: "Leave",
            name,
            text: "${name} left the chat.",
            sentAt: new Date().toISOString()
        });
    }
}
//# sourceMappingURL=messageDispatcher.js.map