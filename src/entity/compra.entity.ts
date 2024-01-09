import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { CarroDeComprasEntity } from './carro-de-compras.entity';

@Entity('compra')
export class CompraEntity {
  @PrimaryGeneratedColumn()
  NumeroDeTransaccion: number;

  @ManyToOne(() => CarroDeComprasEntity, carroDeCompras => carroDeCompras.compras)
  @JoinColumn({ name: 'idcarrito' })
  carroDeCompras: CarroDeComprasEntity;

  //@Column()
  //idcarrito: number;

  @Column({ type: 'varchar', length: 255 })
  metodoPago: string;

  @Column({ type: 'int' })
  totalPagado: number;

}