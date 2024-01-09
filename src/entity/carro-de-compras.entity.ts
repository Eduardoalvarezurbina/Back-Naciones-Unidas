import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import { ProductoEntity } from './producto.entity';
import { CajaEntity } from './caja.entity';
import { CompraEntity } from 'src/entity/compra.entity';

@Entity('carro-de-compras')
export class CarroDeComprasEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  idProducto: number;

  @Column({ type: 'int', nullable: true })
  idCaja: number;

  @Column({ name: 'cantidad_producto', type: 'int' })
  cantidadProducto: number;

  @Column()
  idCarrito: number;

  @Column({ name: 'cantidad_caja', type: 'int' })
  cantidadCaja: number;

  @ManyToMany(() => CompraEntity, compra => compra.carroDeCompras)
  compras: CompraEntity[];
}