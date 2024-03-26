import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { QueryTodoParamsDto } from './dto/query-todo-params.dto';
import { TodoVariant } from './type';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, example: 4 })
  @ApiQuery({
    name: 'variant',
    required: false,
    type: String,
    enum: TodoVariant,
  })
  getAll(@Query() params: QueryTodoParamsDto) {
    return this.todoService.getAll(params);

  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'ID of the todo' })
  getOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') todoId: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return await this.todoService.editTodo(todoId, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
