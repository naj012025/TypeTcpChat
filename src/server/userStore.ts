//mkdir is like normal creates dir/folder and rest is self explained.
import {mkdir, readFile,writeFile} from "node:fs/promises";
import {dirname} from "node:path";
//stored in json file but will try to use this on a postgres db or something.
export interface UserAccount {
    userName: string;
    salt: string;
    passwordHash: string;
}

//empty brackets here makes when creating a userstore it stores it and does nothing in the constructor.
export class UserStore {
    public constructor(private readonly filePath: string) {}

    public async getAll(): Promise<UserAccount[]> {
        try {
            const json = await readFile(this.filePath, "utf-8");
            return JSON.parse(json) as UserAccount[];
        }catch(error) {                         //ENOENT is ERRORNOENTRY.
            if (isNodeError(error) && error.code === "ENOENT") {
                return [];
            }
            throw error;
        }
    }

    public async saveAll(users: UserAccount[]): Promise<void> {
        await mkdir(dirname(this.filePath), {recursive: true});
        await writeFile(this.filePath, JSON.stringify(users,null,2), "utf8");
    }
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
    return error instanceof Error;
}


