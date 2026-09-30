import { ChatClient } from "./chatClient.js";

const client = new ChatClient();
await client.start("127.0.0.1", 5000);