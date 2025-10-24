import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cv } from '../../cv/entities/cv.entity';
import { BaseEntity } from '../../common/entities/base.entity';



@Entity('user')
export class User extends BaseEntity {
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @OneToMany(() => Cv, (cv) => cv.user, {})
  cvs: Cv[];
}