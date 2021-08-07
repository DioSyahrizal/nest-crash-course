import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateUserDto } from './dto/createuser.dto';
import { ResponseCreateUserDTO } from './dto/createuser.response.dto';
import { DeleteUserDTO } from './dto/deleteuser.response.dto';
import { User } from './entities/user.entitiy';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiCreatedResponse({ type: ResponseCreateUserDTO })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  async getUser(@Query('name') name?: string): Promise<User[]> {
    return await this.usersService.findAll(name);
  }

  @ApiCreatedResponse({ type: ResponseCreateUserDTO })
  @ApiNotFoundResponse({ status: 404, description: 'Not Found' })
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.usersService.findById(id);

    return user;
  }

  @ApiCreatedResponse({ type: ResponseCreateUserDTO })
  @ApiBadRequestResponse()
  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(body);
  }

  @ApiCreatedResponse({ type: ResponseCreateUserDTO })
  @ApiBadRequestResponse()
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateUserDto,
  ): Promise<User> {
    const result = await this.usersService.updateUser(id, body);
    return result;
  }

  @ApiResponse({
    status: 201,
    description: 'Return status ok',
    type: DeleteUserDTO,
  })
  @ApiNotFoundResponse({ status: 404, description: 'Not Found' })
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<any> {
    const user = await this.usersService.deleteUser(id);
    if (user) {
      return { status: 'ok' };
    } else {
      throw new HttpException({ error: 'User not found' }, 404);
    }
  }
}
