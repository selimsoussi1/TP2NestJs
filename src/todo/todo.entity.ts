import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { StatusEnum } from './status.enum';

@Entity('todo')
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  name: string;

  @Column('text')
  description: string;

  // Date de création, automatique et immuable
  @CreateDateColumn({ type: 'timestamp', update: false })
  createdAt: Date;

  // Date de dernière modification, automatique
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  // Date de suppression, pour soft delete
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.PENDING,
  })
  status: StatusEnum;
}
