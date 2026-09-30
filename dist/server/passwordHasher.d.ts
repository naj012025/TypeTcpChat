export interface PasswordRecord {
    salt: string;
    passwordHash: string;
}
export declare function hashPassword(password: string): Promise<PasswordRecord>;
export declare function verifyPassword(password: string, saltBase64: string, expectedHashBase64: string): Promise<boolean>;
//# sourceMappingURL=passwordHasher.d.ts.map