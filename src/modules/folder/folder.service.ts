import { Injectable } from '@nestjs/common';
import { readdirSync } from 'fs-extra';

@Injectable()
export class FolderService {
    constructor() { }

    getFolders(path: string) {
        return readdirSync(path, { withFileTypes: true }).filter(dir => dir?.isDirectory())
    }
}
