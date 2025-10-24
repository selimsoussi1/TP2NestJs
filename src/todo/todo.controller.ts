import { Controller, Get, Post, Body, Param, Patch, Delete, Req, ParseIntPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Request } from 'express';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoservice: TodoService) {}

  @Get()
  getAll(@Req() req: Request & { userId?: string }) {
    const userId = req.userId as string;
    return this.todoservice.findAll(userId);
  }

  @Post()
  create(@Body() body: CreateTodoDto, @Req() req: Request & { userId?: string }) {
    const userId = req.userId as string;
    return this.todoservice.create({ ...body, userId });
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateTodoDto, @Req() req: Request & { userId?: string }) {
    return this.todoservice.update(id, req.userId as string, body as any);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request & { userId?: string }) {
    return this.todoservice.remove(id, req.userId as string);
  }
}