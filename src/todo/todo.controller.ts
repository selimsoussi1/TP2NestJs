import { Body, Controller, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createTodoDto: CreateTodoDto) {
    return createTodoDto;
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Body() updateTodoDto: UpdateTodoDto) {
    return updateTodoDto;
  }
}
