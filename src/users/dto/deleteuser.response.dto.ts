import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserDTO {
  @ApiProperty({ required: true, example: 'ok' })
  readonly status: string;
}
