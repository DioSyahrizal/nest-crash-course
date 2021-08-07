import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createuser.dto';
import { User } from './entities/user.entitiy';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findAll(name?: string): Promise<User[]> {
    if (name) {
      const selectUser = await this.userRepo
        .createQueryBuilder('user')
        .where('user.name = :name', { name: name })
        .execute();
      return selectUser;
    }
    return this.userRepo.find();
  }

  async findById(userId: number): Promise<User> {
    const user = await this.userRepo.findOne(userId);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = { id: Date.now(), ...createUserDto };
    const user = await this.userRepo.save(newUser);

    return user;
  }

  async updateUser(id: number, createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findById(id);

    user.name = createUserDto.name;
    await this.userRepo.update(id, user);
    return await this.findById(id);
  }

  async deleteUser(id: number): Promise<boolean> {
    const user = this.findById(id);
    if (!user) {
      return false;
    }
    await this.userRepo.delete(id);
    return true;
  }
}
