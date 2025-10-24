import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Skill } from '../../skill/entities/skill.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('cv')
export class Cv extends BaseEntity {
  @Column({
    length: 30,
  })
  name: string;
  @Column({
    length: 10,
  })
  firstname: string;
  @Column({
    length: 10,
  })
  job: string;
  @Column({
    length: 20,
  })
  path: string;
  @Column({
    length: 50,
  })
  cin: string;
  @Column()
  age: number;
  @ManyToOne(() => User, (user) => user.cvs, {})
  user: User;

  @ManyToMany(() => Skill, (skill) => skill.cvs, {})
  @JoinTable({
    name: 'cv_skill',
    joinColumn: {
      name: 'cv',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'skill',
      referencedColumnName: 'id',
    },
  })
  skills: Skill[];
}