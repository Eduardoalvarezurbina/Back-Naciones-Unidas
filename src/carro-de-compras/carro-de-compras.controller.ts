import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { CarroDeComprasService } from './carro-de-compras.service';
import { CarroDeComprasDto } from './dto/carro-de-compras.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Carro de Compras')
@Controller('carro-de-compras')
export class CarroDeComprasController {
  constructor(private readonly carroDeComprasService: CarroDeComprasService) {}

  @ApiOperation({ summary: 'Agregar producto al carrito' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  //@UseGuards(AuthGuard)
  @Post()
  async agregarProductoAlCarrito(@Body() carrito: CarroDeComprasDto[]): Promise<any> {
    if (carrito.length === 0) {
      return { mensaje: 'No se han enviado productos' };
    }
    try {
      const respuesta = await this.carroDeComprasService.verificarStock(carrito);
      const { carritoSinStockProducto, carritoSinStockCaja, carritoConStock } = respuesta;
  
      if (carritoSinStockProducto.length === 0 && carritoSinStockCaja.length === 0) {
        // Realizar la confirmación del carrito
        const respuesta= {carritoConStock, mensaje : 'Confirmar compra'};
        return respuesta;
      } else {
        // Mostrar mensaje para modificar el carrito
        return { mensaje: 'Modificar el carrito para avanzar o seguir comprando' };
      }
    } catch (error) {
      console.error(error); // Imprimir el error en la consola para propósitos de depuración
      return { mensaje: 'Error al agregar los productos al carrito de compras' };
    }
  }

  @ApiOperation({ summary: 'Obtener nombre del carrito de compras' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @Get()
  obtenerNombreCarroDeCompras(): string {
    return 'Carro de compras';
  }
}