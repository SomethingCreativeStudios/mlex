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
    UserModule,
    ConfigModule,
    TaskModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmOptions,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
