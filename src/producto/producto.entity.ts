import { CompraEntity } from 'src/compra/compra.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('productos')
export class ProductoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  categoria: string;

  @Column()
  descripcion: string;

  @Column()
  precio: number;

  @Column()
  imagen: string;

  @Column()
  stock: number;

  @Column()
  compraId: string;

  @ManyToOne(() => CompraEntity, compra => compra.productos)
  compra: CompraEntity;

  
}