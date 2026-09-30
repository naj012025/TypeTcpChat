export interface UserAccount {
    userName: string;
    salt: string;
    passwordHash: string;
}
export declare class UserStore {
    private readonly filePath;
    constructor(filePath: string);
    getAll(): Promise<UserAccount[]>;
    saveAll(users: UserAccount[]): Promise<void>;
}
//# sourceMappingURL=userStore.d.ts.map