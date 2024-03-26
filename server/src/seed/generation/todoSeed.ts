import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from 'src/todo/todo.entity';
import { SeederInterface } from '../seeder.interface';
import { CreateTodoDto } from 'src/todo/dto/create-todo.dto';
import { TodoPriority, TodoVariant } from 'src/todo/type';
import { faker } from '@faker-js/faker';
import { BoardService } from 'src/board/board.service';
import { TodoService } from 'src/todo/todo.service';

@Injectable()
export class TodoSeed implements SeederInterface {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private readonly boardService: BoardService,
    private readonly todoService: TodoService,
  ) { }

  async seed() {
    const board = await this.boardService.getAll({})

    for (let i = 25; i > 0; i--) {
      const todovariant =
        i % 3 === 0
          ? TodoVariant.todo
          : i % 3 === 1
            ? TodoVariant.progress
            : TodoVariant.planned;

      const todoSeed: CreateTodoDto = {
        title: `Todo${i}`,
        description: faker.lorem.paragraph(),
        boardId: board.boards[0].id,
        priority: TodoPriority.medium,
        variant: todovariant,
      };

      await new Promise(resolve => setTimeout(resolve, 10));

      await this.todoService.create(todoSeed);
    }
  }
}
