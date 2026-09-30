export type AuthType = "Login" | "Register";
export type ChatMessageType = "Chat" | "Join" | "Leave";
export interface AuthRequest {
    type: AuthType;
    userName: string;
    password: string;
}
export interface AuthResponse {
    type: "AuthResponse";
    success: boolean;
    message: string;
}
export interface ChatSendRequest {
    type: "chat";
    text: string;
}
export interface ChatMessage {
    type: ChatMessageType;
    name: string;
    text: string;
    sentAt: string;
}
export type ClientMessage = AuthRequest | ChatSendRequest;
export type ServerMessage = AuthResponse | ChatMessage;
//# sourceMappingURL=messages.d.ts.map