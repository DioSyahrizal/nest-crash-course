import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @ApiProperty()
  @Column({ primary: true })
  id: number;

  @ApiProperty()
  @Column({ nullable: false })
  name: string;
}
