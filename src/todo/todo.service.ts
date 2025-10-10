// src/todo/todo.service.ts
import { Injectable } from '@nestjs/common';
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

 // Ajouter un Todo dans la base
addTodo(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    // Création de l'entité Todo
    const todo = this.todoRepository.create({
      name: createTodoDto.name,
      description: createTodoDto.description,
      status: createTodoDto.status ? StatusEnum[createTodoDto.status.toUpperCase()] : undefined, // utilise l'enum StatusEnum
    });

    // Sauvegarde dans la base et retour de l'objet complet
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

async deleteTodo(id: number): Promise<string> {
  const result = await this.todoRepository.delete(id);

  if (result.affected === 0) {
    throw new Error(`Aucun todo trouvé avec l'id ${id}`);
  }

  return `Le todo avec l'id ${id} a été supprimé avec succès`;
}


}
