import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductoEntity } from './producto.entity';
import { ProductoInputDto } from './dto/producto-input.dto';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(ProductoEntity)
    private readonly productoRepository: Repository<ProductoEntity>,
  ) {}

  async crearProducto(productoDto: ProductoInputDto): Promise<ProductoEntity> {
    const producto = this.productoRepository.create(productoDto);
    return await this.productoRepository.save(producto);
  }

  async obtenerProductoPorId(id: number): Promise<ProductoEntity> {
    const producto = await this.productoRepository.findOne({ where: { id } });

    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    return producto;
  }

  async obtenerTodosLosProductos(): Promise<ProductoEntity[]> {
    return await this.productoRepository.find();
  }
}