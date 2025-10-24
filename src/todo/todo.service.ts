import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(TodoEntity) private repo: Repository<TodoEntity>) {}

  create(data: Partial<TodoEntity>) {
    const t = this.repo.create(data);
    return this.repo.save(t);
  }

  findAll(userId: string) {
    return this.repo.findBy({ userId });
  }

  async update(id: number, userId: string, patch: Partial<TodoEntity>) {
    const todo = await this.repo.findOneBy({ id });
    if (!todo) throw new NotFoundException('Todo not found');
    if (todo.userId != userId) throw new ForbiddenException('Not owner');

    await this.repo.update({ id }, patch);
    return this.repo.findOneBy({ id });
  }

  async remove(id: number, userId: string) {
    const todo = await this.repo.findOneBy({ id });
    if (!todo) throw new NotFoundException('Todo not found');
    if (todo.userId != userId) throw new ForbiddenException('Not owner');
    
    return this.repo.remove(todo);
  }
}