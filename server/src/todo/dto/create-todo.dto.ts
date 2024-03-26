import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString, Length } from 'class-validator';
import { TodoPriority, TodoVariant } from '../type';
import { CreateDateColumn } from 'typeorm';
import { IsUnique } from 'src/validation/is-unique';

export class CreateTodoDto {

  @ApiProperty({
    example: '000',
  })
  @IsNotEmpty()
  readonly boardId: string;

  @ApiProperty({
    example: 'Amber',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 70)
  @IsUnique({ tableName: 'todo', column: 'title' })
  readonly title: string;

  @ApiProperty({
    example: 'Amber helps clients access liquidity, earn yield, and manage risk across crypto-assets.',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 300)
  readonly description: string;

  @ApiProperty({
    example: 'planned',
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(TodoVariant))
  readonly variant: TodoVariant;

  @ApiProperty({
    example: 'medium',
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(TodoPriority))
  readonly priority: TodoPriority;

  @ApiProperty({
    example: '2024-03-25T12:00:00.000Z',
    type: Date,
  })
  @CreateDateColumn()
  deadline?: Date;
}
