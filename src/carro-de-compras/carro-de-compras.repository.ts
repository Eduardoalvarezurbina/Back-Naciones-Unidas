import { EntityRepository, Repository } from 'typeorm';
import { CarroDeCompras } from './carro-de-compras.entity';

@EntityRepository(CarroDeCompras)
export class CarroDeComprasRepository extends Repository<CarroDeCompras> {
 
}
