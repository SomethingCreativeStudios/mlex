import { NovelService } from './novel.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [NovelService],
    controllers: [],
    providers: [NovelService],
})
export class NovelModule { }
