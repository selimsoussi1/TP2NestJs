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

  // src/todo/todo.service.ts
async updateTodo(id: number, updateTodoDto: UpdateTodoDto) {
  // 1️⃣ On cherche le Todo dans la base
  const todo = await this.todoRepository.findOne({ where: { id } });

  // 2️⃣ Si le Todo n’existe pas → on renvoie une erreur
  if (!todo) {
    throw new Error(`Le Todo avec l'id ${id} n'existe pas`);
  }

  // 3️⃣ On met à jour les champs (seulement ceux envoyés dans le body)
  Object.assign(todo, updateTodoDto);

  // 4️⃣ On sauvegarde la mise à jour dans la base
  return  this.todoRepository.save(todo);
}

}
