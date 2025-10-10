import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { StatusEnum } from '././status.enum';


@Entity('todo')

export class TodoEntity {
    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    createdAt: Date;

    @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.PENDING
    })
status: StatusEnum;
}