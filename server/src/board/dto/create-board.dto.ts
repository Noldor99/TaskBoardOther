import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { IsUnique } from 'src/validation/is-unique';

export class CreateBoardDto {
  @ApiProperty({
    example: 'Amber',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  @IsUnique({ tableName: 'board', column: 'title' })
  readonly title: string;

}
