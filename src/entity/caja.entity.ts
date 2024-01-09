import { CarroDeComprasEntity } from 'src/entity/carro-de-compras.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';

@Entity('cajas')
export class CajaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombreProducto: string;

  @Column()
  precio: number;

  @Column()
  clasificacion: string;

  @Column()
  sku: string; 

  @Column()
  cantidad: number;

  @Column()
  descripcion: string;

  @Column()
  imagen1: string;

  @Column({ nullable: true })
  imagen2?: string;

  @Column({ nullable: true })
  imagen3?: string;

  @Column('simple-array')
  productosIncluidos: string[];

  //@ManyToMany(() => CarroDeComprasEntity, (carroDeCompras) => carroDeCompras.caja)
  //carroDeCompras: CarroDeComprasEntity;
}