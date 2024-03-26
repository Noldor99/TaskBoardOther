import { Module } from '@nestjs/common'
import { SeedService } from './seed.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module'
import { ResetTotalDataSeed } from './generation/resetTotalDataSeed';
import { Board } from 'src/board/board.entity';
import { Todo } from 'src/todo/todo.entity';
import { BoardModule } from 'src/board/board.module';
import { TodoModule } from 'src/todo/todo.module';
import { BoardSeed } from './generation/boardSeed';
import { TodoSeed } from './generation/todoSeed';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Board, Todo]),
    BoardModule,
    TodoModule
  ],
  providers: [
    SeedService,
    ResetTotalDataSeed,
    BoardSeed,
    TodoSeed,
  ],
  exports: [SeedService]

})
export class SeedModule { }
