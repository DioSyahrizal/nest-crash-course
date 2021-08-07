import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Nana' })
  @IsAlphanumeric()
  name: string;
}
