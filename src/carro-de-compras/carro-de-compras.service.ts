import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarroDeComprasRepository } from './carro-de-compras.repository';
import { ProductoRepository } from '../producto/producto.repository';
import { CarroDeCompras } from './carro-de-compras.entity';
import { CarroDeComprasInputDto } from './dto/carro-de-compras-input.dto';

@Injectable()
export class CarroDeComprasService {
  constructor(
    @InjectRepository(CarroDeComprasRepository)
    private carroDeComprasRepository: CarroDeComprasRepository,
    @InjectRepository(ProductoRepository) 
    private productoRepository: ProductoRepository,
  ) {}

  async agregarProducto(carroId: number, productoId: number): Promise<CarroDeCompras> {
    const carro = await this.carroDeComprasRepository.findOne({where: {id: carroId } });
    const producto = await this.productoRepository.findOne({ where: { id: productoId } });

    if (!carro || !producto) {
        throw new NotFoundException('Carro o producto no encontrado');
    }

    const nuevoItemCarro = this.carroDeComprasRepository.create({
        producto,
        cantidad: 1, // Puedes cambiar esto si necesitas una cantidad diferente
    });

    await this.carroDeComprasRepository.save(nuevoItemCarro);

    return nuevoItemCarro;
  }
}