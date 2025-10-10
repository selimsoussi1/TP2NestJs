import { Body, Controller, Delete, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
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
@Put(':id')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
async update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
  return this.todoService.updateTodo(id, updateTodoDto);
}

@Delete(':id')
  async delete(@Param('id') id: number) {
    return this.todoService.deleteTodo(id);
  }
  @Delete('soft/:id')
  async softDelete(@Param('id') id: number) {
    return this.todoService.softDeleteTodo(id);
  }
   @Patch('restore/:id')
  async restore(@Param('id') id: number) {
    return this.todoService.restoreTodo(id);
  }
}
