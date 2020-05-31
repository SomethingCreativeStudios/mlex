import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';

@Module({
    imports: [FolderService],
    controllers: [],
    providers: [FolderService],
})
export class FolderModule { }
