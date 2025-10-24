
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { TodoEntity } from './todo/todo.entity';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { TodoModule } from './todo/todo.module';
import { CvModule } from './cv/cv.module';
import { UserModule } from './user/user.module';
import { SkillModule } from './skill/skill.module';
import { AuthMiddleware } from './middleware/auth/auth.middleware';

@Module({
  imports: [
    CommonModule,
    TodoModule,
    JwtModule.register({
      global: true,
      secret: 'your-secret-key',  // Replace with a secure secret key in production
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nestuser',
      password: 'password123',
      database: 'test',
      entities: ["dist/**/*.entity{.ts,.js}"],
      autoLoadEntities: true,
      synchronize: true, // Génère automatiquement les tables
      logging: true,
    }),
    TypeOrmModule.forFeature([TodoEntity]),
    CvModule,
    UserModule,
    SkillModule // Injection du repository
  ],
  controllers: [
    AppController,
    TodoController // Controller pour gérer les routes /todo
  ],
  providers: [
    AppService,
    TodoService,
     // Service pour la logique métier
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'todo', method: RequestMethod.POST },
        { path: 'todo/*', method: RequestMethod.ALL }
      );
  }
}
