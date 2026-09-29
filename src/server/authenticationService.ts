
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

    public async register(userName: string, password: string): Promise<AuthResponse> {
        const users = await this.userStore.getAll();

        const exists = users.some(
            user => user.userName.toLowerCase() ===  userName.toLowerCase())
    

    if (exists) {
        return {type: "AuthResponse", success: false, message: "Username already exists."};
    }

    const passwordRecord = await hashPassword(password);

    users.push({
        userName,
        salt: passwordRecord.salt,
        passwordHash: passwordRecord.passwordHash
    });

    await this.userStore.saveAll(users);
    
    return {type: "AuthResponse", success: true, message: "Registration successful." };
    }

    private async login(userName: string, password: string): Promise<AuthResponse> {
        const users = await this.userStore.getAll();
        const user = users.find(
            item => item.userName.toLowerCase() === userName.toLowerCase());
            
            if(!user) {
                return {type: "AuthResponse", success: false, message: "Invalid credentials."};
            }

            const valid = await verifyPassword(password, user.salt, user.passwordHash);

            return valid
            ? { type: "AuthResponse", success: true, message: "Login successful"}
            : { type: "AuthResponse", success: false, message: "invalid Credentials"};    
    }
}


