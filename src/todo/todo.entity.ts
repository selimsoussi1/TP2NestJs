import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { StatusEnum } from './status.enum';
import { BaseEntity } from '../common/entities/base.entity';

@Entity('todo')
export class TodoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  name: string;
  @Column('text')
  description: string;
  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.PENDING,
  })
  status: StatusEnum;
}
