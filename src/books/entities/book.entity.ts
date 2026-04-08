import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('books')
export class Book {
  @ApiProperty({ example: 1, description: 'ID of the book' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'The Lord of the Rings', description: 'Title of the book' })
  @Column()
  title: string;

  @ApiProperty({ example: 'J.R.R. Tolkien', description: 'Author of the book' })
  @Column()
  author: string;

  @ApiProperty({ example: '2021-01-01', description: 'Date the book was read' })
  @Column({ type: 'date' })
  readDate: Date;

  @ApiProperty({ example: true, description: 'Whether the book has been completed' })
  @Column({ default: false })
  completed: boolean;
}
