import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users', database: 'apis' })
export class users {
  @PrimaryGeneratedColumn({ type: 'int' })
  id_users: number;

  @Column({ type: 'varchar', length: 50 })
  user: string;

  @Column({ type: 'varchar', length: 100 })
  pass: string;

  @Column({ type: 'int', default: () => 0 })
  status: number;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;
}
