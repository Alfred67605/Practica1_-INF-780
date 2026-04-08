import { IsString, IsNotEmpty, IsBoolean, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'The Lord of the Rings', description: 'Title of the book' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'J.R.R. Tolkien', description: 'Author of the book' })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ example: '2021-01-01', description: 'Date the book was read' })
  @IsDateString()
  @IsNotEmpty()
  readDate: string;

  @ApiProperty({ example: true, description: 'Whether the book has been completed', required: false })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
