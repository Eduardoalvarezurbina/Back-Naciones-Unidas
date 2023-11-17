import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProductoEntity } from 'src/producto/producto.entity'; 

@Entity('carro_de_compras') 
export class CarroDeCompras {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductoEntity, { eager: true }) 
  @JoinColumn({ name: 'producto_id' }) 
  producto: ProductoEntity;

  @Column({ type: 'int' })
  cantidad: number;

 
}
