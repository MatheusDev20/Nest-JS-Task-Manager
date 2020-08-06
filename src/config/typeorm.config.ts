import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: process.env.USER,
        password: process.env.PASSWORD,
        database: "nest-js-task-manager",
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: true
}
