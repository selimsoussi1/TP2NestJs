
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cv } from '../../cv/entities/cv.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('skill')
export class Skill extends BaseEntity {
  @Column()
  designation: string;

  @ManyToMany(() => Cv, (cv) => cv.skills)
  cvs: Cv[];
}