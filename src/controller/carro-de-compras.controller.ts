import { Controller, Post, Body, UseGuards, Get, Req, Logger } from '@nestjs/common';
import { CarroDeComprasService } from '../service/carro-de-compras.service';
import { CarroDeComprasInputDto } from '../dto/carro-de-compras-input.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { CajaEntity } from 'src/entity/caja.entity';
import { CarroDeComprasEntity } from '../entity/carro-de-compras.entity';
import { ProductoEntity } from 'src/entity/producto.entity';
import { AuthGuard } from 'src/autenticacion/auth.guard';
import { RolesGuard } from 'src/autenticacion/roles.guard';
import { Roles } from 'src/autenticacion/roles.decorador';
import { Permisos } from 'src/autenticacion/permisos.decorador';
import { PermisosGuard } from 'src/autenticacion/permisos.guard';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { CarroDeComprasOutputDto } from '../dto/carro-de-compras-output.dto';


@ApiTags('Carro de Compras')
@Controller('carro-de-compras')
export class CarroDeComprasController {
  private readonly logger = new Logger(CarroDeComprasController.name);
  constructor(private readonly carroDeComprasService: CarroDeComprasService, private readonly jwtService: JwtService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Agregar producto al carrito' })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: CarroDeComprasOutputDto })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  @ApiBearerAuth()
  @ApiBody({ type: CarroDeComprasInputDto })
  @Post() // confirmar-carrito
  @Roles('administrador','usuario', 'invitado')
  @Permisos('confirmar-carrito')
  @UseGuards(PermisosGuard)
  async confirmarCarrito(@Req() req: Request, @Body() carrito: CarroDeComprasInputDto[]): Promise<any> {
    const token = req.headers.authorization?.split(' ')[1];
    const payload = this.jwtService.verify(token,{secret: '1234567'});
    const id= payload['id'];
    if (carrito.length === 0) { // Verificar que se hayan enviado productos
      this.logger.warn('No se han enviado productos');
      return { mensaje: 'No se han enviado productos' };
    }
    try {
      const respuesta = await this.carroDeComprasService.verificarStock(carrito);
      const { carritoSinStockProducto, carritoSinStockCaja, carritoConStock } = respuesta;
  
      if (carritoSinStockProducto.length === 0 && carritoSinStockCaja.length === 0) { //todos los productos con stock
        // Realizar la confirmación del carrito
        const carritoGuardado = await this.carroDeComprasService.guardarCarritoEnBaseDeDatos(carritoConStock,id)
        const respuesta = { carritoGuardado }; //, mensaje : 'Confirmar compra'//};
        this.logger.debug('Confirmar compra');
        return respuesta;
      } else {
        this.logger.warn('Modificar el carrito para avanzar o seguir comprando');
        return { mensaje: 'Modificar el carrito para avanzar o seguir comprando' };
      }
    } catch (error) {
      this.logger.error('Error al agregar los productos al carrito de compras');
      return { mensaje: 'Error al agregar los productos al carrito de compras' };
    }
  
  }
}