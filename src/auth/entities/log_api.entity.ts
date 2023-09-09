import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'log_api', database: 'apis' })
export class log_api {
  @PrimaryGeneratedColumn({ type: 'int' })
  id_log: number;

  @Column({ type: 'int' })
  id_apixuser: number;

  @Column({ type: 'varchar', length: 100 })
  desc: string;

  @Column({ type: 'timestamp' })
  created: Date;
}
