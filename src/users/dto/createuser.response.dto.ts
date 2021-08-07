import { ApiProperty } from '@nestjs/swagger';

export class ResponseCreateUserDTO {
  @ApiProperty({ example: 1 })
  id: string;

  @ApiProperty({ example: 'Nana' })
  name: string;
}
