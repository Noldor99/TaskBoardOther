import { Todo } from 'src/todo/todo.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('board')
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Todo, (todo) => todo.board, { eager: true })
  @JoinColumn({ name: 'boardId' })
  todos: Todo;

  @CreateDateColumn()
  createdAt: Date

}
