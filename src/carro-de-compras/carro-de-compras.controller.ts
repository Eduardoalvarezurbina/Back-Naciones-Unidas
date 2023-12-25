import { Controller, Post, Body } from '@nestjs/common';
import { CarroDeComprasService } from './carro-de-compras.service';
import { ProductoEntity } from '../producto/producto.entity';
import { carro-de-comprasDto } from './dto/carro-de-compras.dto';

@Controller('carro-de-compras')
export class CarroDeComprasController {
  constructor(private readonly carroDeComprasService: CarroDeComprasService) {}

  @Post('agregar-producto')
  async agregarProductoAlCarrito(@Body() productos: ProductoCarroDto[]): Promise<any> {
    //Verificar que la lista no este vacia 
    if (productos.length === 0) {

      // La lista esta vacia
      return { mensaje: 'No se han enviado productos' };
    } 
    // La lista esta llena 

    // Verificar que exista stock de cada producto de mi lista

    // Recorro la lista
    for (const producto of productos) {
      // Obtengo el producto de la base de datos
      const productoEnStock = await this.carroDeComprasService.obtenerProductoPorId(producto.id);

      // Verifico que exista el producto
      if (!productoEnStock) {
        // El producto no existe
        return { mensaje: `No existe el producto con ID ${producto.id}` };
      } else if (productoEnStock.stock < producto.cantidad) {
        // No hay stock suficiente
        return { mensaje: `No hay stock suficiente del producto con ID ${producto.id}` };
      }
    }


    const mensajes: string[] = [];

    for (const producto of productosArray) {
      const productoEnStock = await this.carroDeComprasService.obtenerProductoPorId(producto.id);

      if (!productoEnStock) {
        mensajes.push(`No tenemos el stock suficiente del producto con ID ${producto.id}`);
      } else if (productoEnStock.stock >= producto.stock) {
        const productoCarro: ProductoCarroDto = {
          id: producto.id,
          cantidad: producto.stock,
        };
        this.carroDeComprasService.agregarProducto(productoCarro);
      } else {
        mensajes.push(`No tenemos el stock suficiente del producto con ID ${producto.id}`);
      }
    }

    if (mensajes.length === 0) {
      const compraId = await this.carroDeComprasService.guardarCompra(productosArray);
      return { mensaje: 'Todos los productos han sido agregados al carrito', compraId };
    } else {
      return { mensaje: 'Algunos productos no tienen suficiente stock', errores: mensajes };
    }
  }
}