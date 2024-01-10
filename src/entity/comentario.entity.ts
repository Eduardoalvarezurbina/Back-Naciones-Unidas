import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';
import { ProductoEntity } from './producto.entity';

@Entity('comentarios')
export class ComentarioEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comentario: string;

  @ManyToOne(() => UsuarioEntity, usuario => usuario.comentario)
  usuario: UsuarioEntity;

  @ManyToOne(() => ProductoEntity, producto => producto.comentario)
  producto: ProductoEntity;
}