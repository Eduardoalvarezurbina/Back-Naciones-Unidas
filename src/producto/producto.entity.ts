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
  clasificacion: string;

  @Column()
  sku: string;

  @Column()
  precio: number;

  @Column()
  imagen: string;

  @Column({ nullable: true }) // opcional
  imagen2: string;

  @Column({ nullable: true }) // opcional
  imagen3: string;

  @Column()
  cantidad: number;

  @Column()
  compraId: string;

  @ManyToOne(() => CompraEntity, compra => compra.productos)
  compra: CompraEntity;
}