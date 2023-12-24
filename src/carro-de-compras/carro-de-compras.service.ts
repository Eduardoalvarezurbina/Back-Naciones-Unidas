import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductoEntity } from '../producto/producto.entity';
import { CompraEntity } from '../compra/compra.entity';
import { ProductoCarroDto } from './dto/carro-de-compras.dto';

@Injectable()
export class CarroDeComprasService {
  private carrito: ProductoEntity[] = [];
  //agregarProducto: any;

  constructor(
    @InjectRepository(CompraEntity)
    private readonly compraRepository: Repository<CompraEntity>,
  ) {}

  agregarProducto(producto: ProductoEntity): void {
    this.carrito.push(producto);
  }

  async guardarCompra(productosArray: ProductoEntity[]): Promise<string> {
    const compraId = Date.now().toString();

    const compra = this.compraRepository.create({
      id: compraId,
      productos: productosArray,
    });

    // Guarda la compra en la base de datos
    await this.compraRepository.save(compra);

    // Agrega el ID de la compra al carrito
    this.carrito.push(...productosArray.map(producto => ({ ...producto, compraId })));

    return compraId;
  }

  async obtenerProductoPorId(id: number): Promise<ProductoEntity | undefined> {
    return this.carrito.find(producto => producto.id === id);
  }

  obtenerCarrito(): ProductoEntity[] {
    return this.carrito;
  }

  vaciarCarrito(): void {
    this.carrito = [];
  }
}
