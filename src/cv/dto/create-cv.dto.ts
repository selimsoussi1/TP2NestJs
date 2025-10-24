import { PrimaryGeneratedColumn } from 'typeorm';
export class CreateCvDto {
  @PrimaryGeneratedColumn()
  id: number;
  name: string;
  firstname: string;
  age: number;
  cin: string;
  job: string;
  path: string;
}