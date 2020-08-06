import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from '../tasks/task.status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksModule } from './tasks.module';
import { GetTasksFilterDto } from './dto/get-task.dto';
import { TaskRepository } from './tasks.repository';
import {InjectRepository} from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Not } from 'typeorm';



@Injectable()
export class TasksService {
 
  constructor(
    @InjectRepository(TaskRepository) // Injeção de dependência via @InjectRepository 
    private TaskRepository: TaskRepository) {}  // Definindo TaskRepository como TaskRepository
    
    getTasks(filterDto: GetTasksFilterDto) {
      
    }
     async getTaskById(id: number):Promise<Task> {
        const found = await this.TaskRepository.findOne(id) // Método da classe Repository do TypeORM herdado na TaskRepository
     if(!found) { 
        throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
    }
    async createTask(createTaskDto: CreateTaskDto):Promise<Task> {
      const { title, description} = createTaskDto;
      const task = new Task();
      task.title = title;
      task.description = description;
      task.status = TaskStatus.OPEN;

      await task.save();

      return task;

    }
    async deleteTask(id: number):Promise<Task> {
      let deletedTask = await Task.findOne(id);
      if(!deletedTask) {
        throw new NotFoundException(`Task with this ${id} was not found`);
      }
      this.TaskRepository.delete(deletedTask);

      return deletedTask;
    }
    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
      const task = await this.getTaskById(id)
      console.log(task);
      task.status = status;
      await task.save();
      return task;
    }
}
