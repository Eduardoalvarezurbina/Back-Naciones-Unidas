import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('comentarios')
export class ComentarioEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comentario: string;
}