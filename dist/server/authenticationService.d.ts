import type { AuthRequest, AuthResponse } from "../shared/messages.js";
import { UserStore } from "./userStore.js";
export declare class AuthenticationService {
    private readonly userStore;
    constructor(userStore: UserStore);
    authenticate(request: AuthRequest): Promise<AuthResponse>;
    register(userName: string, password: string): Promise<AuthResponse>;
    private login;
}
//# sourceMappingURL=authenticationService.d.ts.map