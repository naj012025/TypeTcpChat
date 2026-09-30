import { resolve } from "node:path";
import { AuthenticationService } from "../server/authenticationService.js";
import { ChatServer } from "../server/chatServer.js";
import { MessageDispatcher } from "../server/messageDispatcher.js";
import { UserStore } from "../server/userStore.js";
const userStore = new UserStore(resolve("data/users.json"));
const authService = new AuthenticationService(userStore);
const dispatcher = new MessageDispatcher();
const server = new ChatServer(authService, dispatcher);
server.start(5000);
//# sourceMappingURL=main.js.map