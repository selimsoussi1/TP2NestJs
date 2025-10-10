
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { TodoEntity } from './todo/todo.entity';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nestuser',
      password: 'password123',
      database: 'test',
      entities: [TodoEntity],
      synchronize: true, // Génère automatiquement les tables
      logging: true,
    }),
    TypeOrmModule.forFeature([TodoEntity]), // Injection du repository
  ],
  controllers: [
    AppController,
    TodoController, // Controller pour gérer les routes /todo
  ],
  providers: [
    AppService,
    TodoService, // Service pour la logique métier
  ],
})
export class AppModule {}
