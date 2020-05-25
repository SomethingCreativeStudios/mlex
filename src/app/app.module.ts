import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '../config';
import { UserModule } from '../user';
import { TypeOrmOptions } from '../database';

@Module({
  imports: [
    UserModule,
    ConfigModule,
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
