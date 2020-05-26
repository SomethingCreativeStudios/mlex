import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './models';
import { TaskService } from './task.service';

@Module({
    imports: [TypeOrmModule.forFeature([Task])],
    providers: [TaskService],
    controllers: [],
    exports: [TaskService],
})
export class TaskModule { }
