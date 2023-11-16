import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Galeries } from './galeries.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 35, type: 'varchar', unique: true })
  username: string;

  @Column({ length: 100, type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Galeries, (galeries) => galeries.user)
  galeries: Galeries[];
}
