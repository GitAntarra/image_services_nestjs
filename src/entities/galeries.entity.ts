import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users.entity';
@Entity()
export class Galeries {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ length: 100, unique: true })
  filename: string;

  @Column({ type: 'varchar', length: 100 })
  path: string;

  @Column({ type: 'varchar', length: 30 })
  mimetype: string;

  @Column({ type: 'int' })
  size: number;

  @Column({ type: 'varchar', length: 10 })
  ext: string;

  @ManyToOne(() => Users, (user) => user.galeries)
  user: Users;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
