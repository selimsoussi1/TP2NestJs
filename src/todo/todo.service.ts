// src/todo/todo.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { StatusEnum } from './status.enum';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

addTodo(createTodoDto: CreateTodoDto): Promise<TodoEntity> {

    const todo = this.todoRepository.create({
      name: createTodoDto.name,
      description: createTodoDto.description,
      status: createTodoDto.status ? StatusEnum[createTodoDto.status.toUpperCase()] : undefined, 
    });
     return this.todoRepository.save(todo);
    
  }

async updateTodo(id: number, updateTodoDto: UpdateTodoDto) {
  const todo = await this.todoRepository.findOne({ where: { id } });
  if (!todo) {
    throw new Error(`Le Todo avec l'id ${id} n'existe pas`);
  }
  Object.assign(todo, updateTodoDto);
  return  this.todoRepository.save(todo);
}

async deleteTodo(id: number){
  const result = await this.todoRepository.delete(id);

  if (result.affected === 0) {
    throw new Error(`Aucun todo trouvé avec l'id ${id}`);
  }

  return `Le todo avec l'id ${id} a été supprimé avec succès`;
}

async softDeleteTodo(id: number){
  const result = await this.todoRepository.softDelete(id);

  if (result.affected === 0) {
    throw new Error(`Aucun todo trouvé avec l'id ${id}`);
  }
  return `Le todo avec l'id ${id} a été supprimé (soft delete) avec succès`;
}

async restoreTodo(id: number){
  const result = await this.todoRepository.restore(id);

  if (result.affected === 0) {
    throw new Error(`Aucun todo trouvé avec l'id ${id}`);
  }

  return `Le todo avec l'id ${id} a été restauré avec succès`;
}

  
  async countByStatus(): Promise<Record<StatusEnum, number>> {
    const pending = await this.todoRepository.count({
      where: { status: StatusEnum.PENDING },
    });
    const inProgress = await this.todoRepository.count({
      where: { status: StatusEnum.IN_PROGRESS },
    });
    const done = await this.todoRepository.count({
      where: { status: StatusEnum.DONE },
    });
    return {
      [StatusEnum.PENDING]: pending,
      [StatusEnum.IN_PROGRESS]: inProgress,
      [StatusEnum.DONE]: done,
    } as Record<StatusEnum, number>;
  }

  async getAllTodos(): Promise<TodoEntity[]> {
    return this.todoRepository.find(); 
  }
  
  async getTodoById(id: number): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo avec l'id ${id} n'existe pas`);
    }
    return todo;
  }
  
 findAll(
     search?: string,
     status?: StatusEnum,
     page: number = 1,
     nbpage: number = 5,
    
    ): Promise<TodoEntity[]> {
    const query = this.todoRepository.createQueryBuilder('todo');

    if (search) {
      query.andWhere('(todo.name LIKE :search OR todo.description LIKE :search)', {
        search: `%${search}%`,
      });
    }

    if (status) {
      query.andWhere('todo.status = :status', { status });
    }
     query.skip((page - 1)*nbpage).take(nbpage);
    return query.getMany();
  } 
}
