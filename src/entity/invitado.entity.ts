import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { SuscripcionEntity } from './suscripcion.entity';

@Entity('invitados')
export class InvitadoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombreCompleto: string;

  @Column()
  rut: string;

  @Column()
  correo: string;

  @Column()
  region: string;

  @Column()
  comuna: string;

  @Column()
  direccion: string;

  @Column()
  celular: string;

  @OneToMany(() => SuscripcionEntity, suscripcion => suscripcion.invitado)
  suscripciones: SuscripcionEntity[];

  @Column({ nullable: true })
  referencia: string;

 
}