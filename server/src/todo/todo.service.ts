import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Todo } from "./todo.entity"
import { Repository } from "typeorm"
import { CreateTodoDto } from "./dto/create-todo.dto"
import { QueryTodoParamsDto } from "./dto/query-todo-params.dto"
import { UpdateTodoDto } from "./dto/update-todo.dto"
import { BoardService } from "src/board/board.service"

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private boardService: BoardService,
  ) { }


  async create(dto: CreateTodoDto): Promise<Todo> {
    const board = await this.boardService.findOne(dto.boardId);
    const todo = this.todoRepository.create({
      ...dto,
      board
    });
    return await this.todoRepository.save(todo);
  }

  async getAll(dto: QueryTodoParamsDto) {
    const { page = 1, limit = 4, variant } = dto;
    try {
      let queryBuilder = this.todoRepository.createQueryBuilder('todo')
        .orderBy('todo.createdAt', 'DESC')
        .skip((+page - 1) * +limit)
        .take(+limit);

      if (variant) {
        queryBuilder = queryBuilder.where('todo.variant = :variant', { variant });
      }

      const [todos, totalCount] = await queryBuilder.getManyAndCount();

      return { totalCount, todos };
    } catch (e) {
      return { totalCount: 0, todos: [] }
    }
  }


  async findOne(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: { id },
      relations: {},
    })

    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`)
    }

    return todo
  }

  async editTodo(todoId: string, dto: UpdateTodoDto) {
    const todo = await this.findOne(todoId);


    const dtoFilter = Object.keys(dto).reduce((acc, key) => {
      if (dto[key]) acc[key] = dto[key];
      return acc;
    }, {});

    Object.assign(todo, dtoFilter);

    const updatedTodo = await this.todoRepository.save(todo);
    return updatedTodo;
  }


  async remove(id: string) {
    const todo = await this.findOne(id);
    return this.todoRepository.remove(todo)
  }

}
