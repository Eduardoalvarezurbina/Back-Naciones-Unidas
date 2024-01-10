import { CarroDeComprasEntity } from 'src/entity/carro-de-compras.entity';
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ComentarioEntity } from './comentario.entity';

@Entity('productos')
export class ProductoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  clasificacion: string;

  @Column()
  sku: string;

  @Column()
  precio: number;

  @Column({ nullable: true })
  imagen: string;

  @Column({ nullable: true }) // opcional
  imagen2: string;

  @Column({ nullable: true }) // opcional
  imagen3: string;

  @Column()
  cantidad: number;
  
  @OneToMany(() => ComentarioEntity, comentario => comentario.producto)
  comentario: ComentarioEntity[];
} 