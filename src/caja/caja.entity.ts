import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CajaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

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

  @Column('simple-array', { nullable: true })
  productosOpcionales?: string[];
}