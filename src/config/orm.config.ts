import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from 'src/users/entities/user.entitiy';

dotenv.config();
export const ormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT) || 3306,
  username: process.env.DATABASE_USER || 'root',
  database: process.env.DATABASE_NAME || 'test',
  entities: [User],
  synchronize: true,
};
