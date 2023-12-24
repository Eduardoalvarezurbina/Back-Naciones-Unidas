import { Controller, Post, Body } from '@nestjs/common';
import { CompraService } from './compra.service';
import { ProductoCarroDto } from '../carro-de-compras/dto/carro-de-compras.dto';
import { CompraDto } from './compra.dto';

@Controller('compra')
export class CompraController {
  constructor(private readonly compraService: CompraService) {}

  @Post('realizar-compra')
  async realizarCompra(@Body() productosAgregados: CompraDto): Promise<any> {
    try {
      const compraId = Math.floor(Math.random() * 1000) + 1; 
      await this.compraService.realizarCompra(compraId, productosAgregados.productos); 
      return { mensaje: 'Compra realizada exitosamente', compraId };
    } catch (error) {
      return { mensaje: 'Error al realizar la compra', error: error.message };
    }
  }
}