import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';
import { TodoEntity } from './todo.entity';
import { StatusEnum } from './status.enum';

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
   
  @Get('stats')
  async getStats() {
    return this.todoService.countByStatus();
  }

  
 /*@Get() // GET /todo
  async findAll() {
    return this.todoService.getAllTodos();
  }*/
  
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<TodoEntity> {
    return this.todoService.getTodoById(id);
  }

@Get()
  async getAllTodos(
    @Query('search') search?: string,
    @Query('status') status?: StatusEnum,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<TodoEntity[]> {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 10; 
    return this.todoService.findAll(search, status, pageNumber, limitNumber);
  }
}
