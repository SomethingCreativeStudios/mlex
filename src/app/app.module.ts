import { NameFormatterModule } from './../modules/name-formatter/name-formatter.module';
import { NameFormatterService } from './../modules/name-formatter/name-formatter.service';
import { NovelModule } from './../modules/novel/novel.module';
import { FolderModule } from './../modules/folder/folder.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '../config';
import { UserModule } from '../modules/user';
import { TypeOrmOptions } from '../database';
import { TaskModule } from '../modules/tasks';

@Module({
  imports: [
    NameFormatterModule,
    NovelModule,
    FolderModule,
    UserModule,
    ConfigModule,
    TaskModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmOptions,
    }),
  ],
  controllers: [AppController],
  providers: [NameFormatterService, AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
