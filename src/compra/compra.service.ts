import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, RemoveOptions, SaveOptions } from 'typeorm';
import { ProductoEntity } from '../producto/producto.entity';
import { ProductoCarroDto } from '../carro-de-compras/dto/carro-de-compras.dto';

interface ProductoActualizado extends ProductoEntity {
  compraId: number;
}

@Injectable()
export class CompraService {
  constructor(
    @InjectRepository(ProductoEntity)
    private readonly productoRepository: Repository<ProductoEntity>,
  ) {}

  async realizarCompra(compraId: number, productosAgregados: ProductoCarroDto[]): Promise<void> {
    try {
      for (const producto of productosAgregados) {
        const options: FindOneOptions<ProductoEntity> = { where: { id: producto.id } };
        const productoEnStock = await this.productoRepository.findOne(options);

        if (productoEnStock) {
          const productoActualizado: ProductoActualizado = {
              ...productoEnStock,
              stock: productoEnStock.stock - producto.cantidad,
              compraId: compraId,
              hasId: function (): boolean {
                  throw new Error('Function not implemented.');
              },
              save: function (options?: SaveOptions): Promise<ProductoActualizado> {
                  throw new Error('Function not implemented.');
              },
              remove: function (options?: RemoveOptions): Promise<ProductoActualizado> {
                  throw new Error('Function not implemented.');
              },
              softRemove: function (options?: SaveOptions): Promise<ProductoActualizado> {
                  throw new Error('Function not implemented.');
              },
              recover: function (options?: SaveOptions): Promise<ProductoActualizado> {
                  throw new Error('Function not implemented.');
              },
              reload: function (): Promise<void> {
                  throw new Error('Function not implemented.');
              }
          };
          await this.productoRepository.update(productoEnStock.id, productoActualizado);
        }
      }
    } catch (error) {
      throw new Error('Error al realizar la compra');
    }
  }
}