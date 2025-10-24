import { IsNotEmpty, IsString } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateSkillDto {
  @PrimaryGeneratedColumn()
    id: number;
  @IsNotEmpty()
  @IsString()
  designation: string;
}