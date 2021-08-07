import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createuser.dto';
import { User } from './entities/user.entitiy';

@Injectable()
export class UsersService {
  private users: User[] = [{ id: 1, name: 'Dio' }];

  findAll(name?: string): User[] {
    if (name) {
      return this.users.filter((user) => user.name === name);
    }
    return this.users;
  }

  findById(userId: number): User {
    return this.users.find((user) => user.id === userId);
  }

  createUser(createUserDto: CreateUserDto): User {
    const newUser = { id: Date.now(), ...createUserDto };
    this.users.push(newUser);

    return newUser;
  }
}
