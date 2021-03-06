import { Controller, Get, Post, Body, Param, Delete, Put, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from '../tasks/task.status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './tasks.entity';
import { GetTasksFilterDto } from './dto/get-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';


@Controller('tasks')
export class TasksController {

    constructor( private tasksService: TasksService) {}
       @Get()
        getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto) {
            return this.tasksService.getTasks(filterDto);

        }
       @Get('/:id')
        getTaskById( @Param('id', ParseIntPipe) id:number):Promise<Task>{
            return this.tasksService.getTaskById(id);
        }
       @Post()
        @UsePipes(ValidationPipe)

        createTask(@Body() CreateTaskDto: CreateTaskDto):Promise<Task> {
            return this.tasksService.createTask(CreateTaskDto);

        }
       @Delete('/:id')
       deleteTask(@Param('id', ParseIntPipe)  id: number):Promise<Task>{
            return this.tasksService.deleteTask(id);
       }
        @Patch('/:id/status')
        updateTaskstatus( 
        @Param('id', ParseIntPipe) id: number, 
        @Body('status', TaskStatusValidationPipe) status:TaskStatus ):Promise<Task>
        {
           return this.tasksService.updateTaskStatus(id,status);
        }
       
}
