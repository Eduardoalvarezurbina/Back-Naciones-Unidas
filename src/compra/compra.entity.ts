import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { ProductoEntity } from '../producto/producto.entity';

@Entity('compras')
export class CompraEntity {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => ProductoEntity, producto => producto.compra, { cascade: true })
  productos: ProductoEntity[];
}