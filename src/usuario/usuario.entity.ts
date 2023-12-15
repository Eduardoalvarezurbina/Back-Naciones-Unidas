// usuario.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
//import * as bcrypt from 'bcrypt';
import * as Crypto from 'crypto';

@Entity('usuarios')
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  rut: string;

  @Column()
  telefono: string;

  @Column({ unique: true })
  correo: string;

  @Column()
  direccion: string;

  @Column()
  passwordHash: string;

   setClave(clave: string): void{
    
    this.passwordHash = Crypto.createHash( 'md5' ).update(clave).digest('hex')
  }

  
}
