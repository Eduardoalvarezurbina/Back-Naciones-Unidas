import { CarroDeComprasEntity } from 'src/entity/carro-de-compras.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

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

  @Column({ nullable: true })
  referencia: string;

  //@OneToOne(() => CarroDeComprasEntity, carroDeCompras => carroDeCompras.invitado)
  //carroDeCompras: CarroDeComprasEntity;

  
}