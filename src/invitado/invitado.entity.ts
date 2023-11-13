
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { InvitadoOutputDto } from './dto/invitado-output.dto';

@Entity('invitado')
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

  toDto(): InvitadoOutputDto {
    const dto = new InvitadoOutputDto();
    dto.id = this.id;
    dto.nombre_completo = this.nombre_completo;
    dto.region = this.region;
    dto.comuna = this.comuna;
    dto.calle_y_numero = this.calle_y_numero;
    dto.celular = this.celular;
    dto.correo = this.correo;
    dto.informacion_adicional = this.informacion_adicional;
    return dto;
  }
}