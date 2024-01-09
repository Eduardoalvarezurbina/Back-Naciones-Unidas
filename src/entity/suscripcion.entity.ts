import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('suscripciones')
export class SuscripcionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'int' })
  mesesDuracion: number;

  @Column({ type: 'date' })
  fechaInicio: Date;

  @Column({ type: 'date' })
  fechaFin: Date;
}