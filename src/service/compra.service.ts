import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarroDeComprasEntity } from '../entity/carro-de-compras.entity';
import { ProductoEntity } from '../entity/producto.entity';
import { CajaEntity } from '../entity/caja.entity';
import { CompraInputDTO } from '../dto/compra-input.dto';
import { CompraEntity } from '../entity/compra.entity';

@Injectable()
export class CompraService {
  private readonly logger = new Logger(CompraService.name);


  constructor(
    @InjectRepository(CarroDeComprasEntity)
    private carroDeComprasRepository: Repository<CarroDeComprasEntity>,
    @InjectRepository(ProductoEntity)
    private productoRepository: Repository<ProductoEntity>,
    @InjectRepository(CajaEntity)
    private cajaRepository: Repository<CajaEntity>,
    @InjectRepository(CompraEntity)
    private compraRepository: Repository<CompraEntity>,
  ) {}

  async obtenerCarritoGuardado(idCarrito: number): Promise<any[]> {
    this.logger.debug(`Obteniendo carrito guardado con ID: ${idCarrito}`);
    // Busca en la base de datos todos los elementos que tienen el idCarrito especificado
    const carritoGuardado = await this.carroDeComprasRepository.find({ where: { idCarrito } });
    this.logger.debug(`Carrito guardado`);

    return carritoGuardado;
  }

   async guardarCompraEnBaseDeDatos(compraInput: CompraInputDTO): Promise<CompraEntity> {
    this.logger.debug(`Guardando compra en la base de datos`);
    // Crea una nueva compra
    const nuevaCompra = new CompraEntity();
    nuevaCompra.metodoPago = compraInput.metodoPago;
    nuevaCompra.totalPagado = compraInput.totalPagado;
    // Guarda la compra en la base de datos
    return this.compraRepository.save(nuevaCompra);
  }
   async actualizarStock(idCarrito: number): Promise<void> {
   try{
    this.logger.debug(`Actualizando stock`);
    const carrito = await this.obtenerCarritoGuardado(idCarrito);
   
    for (const item of carrito) {
    this.logger.debug(`Item: ${item}`); // Imprime el item actual

    if (item.cantidadProducto > 0) {
      if (item.idProducto) {
        const producto = await this.productoRepository.findOne({ where: { id: item.idProducto } });
        this.logger.debug('Producto:', producto); // Imprime el producto
    
        if (producto) {
          if (producto.cantidad < item.cantidadProducto) {
            this.logger.error('No hay suficiente stock del producto');
            throw new Error('No hay suficiente stock del producto');
          }
          producto.cantidad -= item.cantidadProducto;
          await this.productoRepository.save(producto);
        }
      }
    }
    
    if (item.cantidadCaja > 0) {
      if (item.idCaja) {
        const caja = await this.cajaRepository.findOne({ where: { id: item.idCaja } });
        if (caja) {
          if (caja.cantidad < item.cantidadCaja) {
            this.logger.error('No hay suficiente stock de la caja');
            throw new Error('No hay suficiente stock de la caja');
          }
          caja.cantidad -= item.cantidadCaja;
          await this.cajaRepository.save(caja);
        }
      }
    }
    
  }
}   catch (error) {
    this.logger.error('Error al actualizar el stock:', error);
    throw error;
}
}
}