import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import * as Crypto from 'crypto';
import { CarroDeComprasEntity } from 'src/entity/carro-de-compras.entity';

@Entity('usuarios')
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombreCompleto: string;

  @Column()
  rut: string;

  @Column()
  celular: string;

  @Column()
  region: string;

  @Column()
  comuna: string;

  @Column({ unique: true })
  correo: string;
   
  @Column()
  direccion: string;

  @Column()
  referencias: string;

  @Column()
  passwordHash: string;

  setClave(clave: string): void{
    this.passwordHash = Crypto.createHash( 'md5' ).update(clave).digest('hex')
  }

  //@OneToOne(() => CarroDeComprasEntity, carroDeCompras => carroDeCompras.usuario)
  //carroDeCompras: CarroDeComprasEntity;
}