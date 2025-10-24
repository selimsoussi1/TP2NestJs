import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CvService } from '../cv/cv.service';
import { DataSource } from 'typeorm';
import { randLastName, randFirstName, randJobTitle, randUserName, randEmail, randNoun } from '@ngneat/falso';
import { User } from '../user/entities/user.entity';
import { Skill } from '../skill/entities/skill.entity';
import { Cv } from '../cv/entities/cv.entity';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const dataSource = appContext.get(DataSource);
  const userRepo = dataSource.getRepository(User);
  const skillRepo = dataSource.getRepository(Skill);
  const cvRepo = dataSource.getRepository(Cv);

  const users: User[] = [];
  for (let i = 0; i < 5; i++) {
    const user = userRepo.create({
      username: randUserName(),
      email: randEmail(),
      password: 'password123', 
    });
    users.push(await userRepo.save(user));
  }

  const skills: Skill[] = [];
  for (let i = 0; i < 10; i++) {
    const skill = skillRepo.create({
      designation: randNoun(),
    });
    skills.push(await skillRepo.save(skill));
  }

  for (let i = 0; i < 9; i++) {
    const cv = cvRepo.create({
      name: randLastName(),
      firstname: randFirstName(),
      age: Math.floor(Math.random() * 30) + 20,
      cin: `CIN${i}`,
      job: randJobTitle(),
      path: '/tmp/cv' + i,
      user: users[Math.floor(Math.random() * users.length)],
    });
    await cvRepo.save(cv);
    cv.skills = skills.slice(0, Math.floor(Math.random() * 3) + 1);
    await cvRepo.save(cv);
  }

  console.log('Seed done');
  await appContext.close();
}

bootstrap();