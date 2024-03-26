import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TodoPriority, TodoVariant } from './type';
import { Board } from 'src/board/board.entity';

@Entity('todo')
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TodoVariant })
  variant: TodoVariant;

  @Column({ type: 'enum', enum: TodoPriority, default: TodoPriority.low })
  priority: TodoPriority;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  deadline: Date;

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(() => Board, (board) => board.todos)
  board: Board;

}
