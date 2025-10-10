import { Body, Controller, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}
  @Post()
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
async create(@Body() createTodoDto: CreateTodoDto) {
  return this.todoService.addTodo(createTodoDto);  // <-- appelle la méthode addTodo du service
}

  
}
