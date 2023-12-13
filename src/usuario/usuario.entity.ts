// usuario.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import * as bcrypt from 'bcrypt';

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

  async setClave(clave: string): Promise<void> {
    const saltRounds = 10;
    this.passwordHash = await bcrypt.hash(clave, saltRounds);
  }

  async validarClave(clave: string): Promise<boolean> {
    return await bcrypt.compare(clave, this.passwordHash);
  }
}
