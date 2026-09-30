//mkdir is like normal creates dir/folder and rest is self explained.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
//empty brackets here makes when creating a userstore it stores it and does nothing in the constructor.
export class UserStore {
    filePath;
    constructor(filePath) {
        this.filePath = filePath;
    }
    async getAll() {
        try {
            const json = await readFile(this.filePath, "utf-8");
            return JSON.parse(json);
        }
        catch (error) { //ENOENT is ERRORNOENTRY.
            if (isNodeError(error) && error.code === "ENOENT") {
                return [];
            }
            throw error;
        }
    }
    async saveAll(users) {
        await mkdir(dirname(this.filePath), { recursive: true });
        await writeFile(this.filePath, JSON.stringify(users, null, 2), "utf8");
    }
}
function isNodeError(error) {
    return error instanceof Error;
}
//# sourceMappingURL=userStore.js.map