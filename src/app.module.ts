import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { typeOrmConfig } from './config/typeorm.config'

@Module({
  imports: [
    TasksModule, 
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig)]
})
export class AppModule {
  constructor(private connection: Connection) {}
}
