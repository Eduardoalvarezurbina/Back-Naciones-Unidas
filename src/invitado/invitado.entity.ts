
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { InvitadoOutputDto } from './dto/invitado-output.dto';

@Entity('invitados')
export class InvitadoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre_completo: string;

  @Column()
  region: string;

  @Column()
  comuna: string;

  @Column()
  calle_y_numero: string;

  @Column()
  celular: string;

  @Column()
  correo: string;

  @Column({ nullable: true })
  informacion_adicional: string;

  
}