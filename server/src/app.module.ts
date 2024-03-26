import { Module } from '@nestjs/common'

import { DatabaseModule } from "./database/database.module";
import { TodoModule } from './todo/todo.module';
import { BoardModule } from './board/board.module';


@Module({
  controllers: [],
  providers: [],
  imports: [
    DatabaseModule,
    BoardModule,
    TodoModule
  ]
})

export class AppModule { }
