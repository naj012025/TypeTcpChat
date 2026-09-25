
import { pbkdf2, randomBytes,timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const pbkdf2Async = promisify(pbkdf2);
const iterations = 200_000;
const keyLength = 32;
const digest = "sha256";

export interface PasswordRecord {
    salt: string;
    passwordHash: string;
}
//makes a method importable that hashes using pbkdft2 and returns salt and passhash.
export async function hashPassword(password: string): Promise<PasswordRecord> {
    const salt = randomBytes(16);
    const hash = await pbkdf2Async(password, salt,iterations,keyLength,digest);

    return {
        salt: salt.toString("base64"),
        passwordHash: hash.toString("base64")
    };
}

export async function verifyPassword(
    password: string,
    saltBase64: string, 
    expectedHashBase64: string,
    ): Promise<boolean> {
        const salt = Buffer.from(saltBase64, "base64");
        const expected = Buffer.from(expectedHashBase64, "base64");
        const actual = await pbkdf2Async(password, salt, iterations,keyLength,digest);
                            //mustmatch on line 34.
        return actual.length === expected.length && timingSafeEqual(actual, expected);
    }