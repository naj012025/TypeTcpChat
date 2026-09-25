
import type { AuthRequest, AuthResponse } from "../shared/messages.js";
import { hashPassword,verifyPassword } from "./passwordHasher.js";
import { UserStore } from "./userStore.js";

export class AuthenticationService {
    public constructor(private readonly userStore: UserStore) {}

    public async authenticate(request: AuthRequest): Promise<AuthResponse> {
        return request.type === "Register"
        ? this.register(request.userName, request.password)
        : this.login(request.userName, request.password);
    }

    public async register(userName: string, password: string): Promise<AuthResponse> {7
        const users = await this.userStore.getAll();
        const exists = users.some(user => user.userName.toLowerCase() ===  userName.toLowerCase())
    }:


}
