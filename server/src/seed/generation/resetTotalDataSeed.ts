import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/board/board.entity';
import { Todo } from 'src/todo/todo.entity';

import { Repository } from 'typeorm';

@Injectable()
export class ResetTotalDataSeed {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) { }

  async seed(): Promise<void> {
    const repositories = [
      this.todoRepository,
      this.boardRepository,
    ];

    try {
      for (const repository of repositories) {
        const items = await repository.find();
        for (const item of items) {
          //@ts-ignore
          await repository.remove(item);
        }
      }
    } catch (error) {
      console.error('Помилка під час видалення записів:', error);
      throw error;
    }
  }
}
