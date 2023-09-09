import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'api', database: 'apis' })
export class api {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'int' })
  port: number;

  @Column({ type: 'int', default: () => 0 })
  status: number;
}
