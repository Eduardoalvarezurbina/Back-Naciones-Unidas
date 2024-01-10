import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';
import { InvitadoEntity } from './invitado.entity';

@Entity('suscripciones')
export class SuscripcionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsuarioEntity, { nullable: true })
  @JoinColumn({ name: 'id_usuario' }) 
  usuario?: UsuarioEntity;

  @ManyToOne(() => InvitadoEntity, { nullable: true })
  @JoinColumn({ name: 'id_invitado' }) 
  invitado?: InvitadoEntity;

  @Column({ type: 'int' })
  mesesDuracion: number;

  @Column({ type: 'date' })
  fechaInicio: Date;

  @Column({ type: 'date' })
  fechaFin: Date;
}