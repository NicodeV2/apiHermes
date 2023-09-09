import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'apixuser', database: 'apis' })
export class apixuser {
  @PrimaryGeneratedColumn({ type: 'int' })
  id_apixuser: number;

  @Column({ type: 'int' })
  id_api: number;

  @Column({ type: 'int' })
  id_user: number;

  @Column({ type: 'int', default: () => 0 })
  status: number;
}
