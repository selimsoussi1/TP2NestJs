import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { TypeOrmModule} from '@nestjs/typeorm';
import { TodoEntity } from './todo/todo.entity';



@Module({
  imports: [
    CommonModule
    
    ,TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nestuser',
      password: 'password123',
      database: 'test',
      entities : [TodoEntity],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([TodoEntity]),
  
  
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
