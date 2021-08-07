import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { CreateUserDto } from './dto/createuser.dto';
import { ResponseCreateUserDTO } from './dto/createuser.response.dto';
import { User } from './entities/user.entitiy';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiQuery({ name: 'name', required: false })
  @Get()
  getUser(@Query('name') name?: string): User[] {
    return this.usersService.findAll(name);
  }

  @ApiCreatedResponse({ type: ResponseCreateUserDTO })
  @ApiNotFoundResponse({ status: 404, description: 'Not Found' })
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): User {
    const user = this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @ApiCreatedResponse({ type: ResponseCreateUserDTO })
  @ApiBadRequestResponse()
  @Post()
  createUser(@Body() body: CreateUserDto): User {
    return this.usersService.createUser(body);
  }
}
