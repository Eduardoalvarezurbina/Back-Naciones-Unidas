import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CarroDeComprasService } from '../service/carro-de-compras.service';
import { ApiBody, ApiHeader, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../autenticacion/roles.guard';
import { Roles } from '../autenticacion/roles.decorador';
import { Permisos } from '../autenticacion/permisos.decorador';
import { PermisosGuard } from '../autenticacion/permisos.guard';
import { AuthGuard } from '../autenticacion/auth.guard';
import { Request } from 'express'
import { CompraService } from '../service/compra.service';
import { CompraInputDTO } from '../dto/compra-input.dto';

@ApiTags('Compra')
@Controller('compra')
export class CompraController {
  private readonly logger = new Logger(CompraController.name);
  constructor(
    private readonly carroDeComprasService: CarroDeComprasService,
    private readonly jwtService: JwtService,
    private readonly CompraService: CompraService
  ) {}
 
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Obtener carrito guardado' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  @ApiHeader({ name: 'Authorization', description: 'Token de autenticación' })
  @Get()//Obtener carrito guardado
  @Roles('usuario', 'invitado')
  @Permisos('ver-carrito')
  @UseGuards(PermisosGuard)
  async obtenerCarritoGuardado(@Req() req: Request): Promise<any> {
    this.logger.debug('Obteniendo carrito guardado');
    const token = req.headers.authorization?.split(' ')[1];
    const payload = this.jwtService.verify(token, { secret: '1234567' });
    const id = payload['id'];
  
    return this.CompraService.obtenerCarritoGuardado(id);
  }
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Descontar el carrito de compras del stock' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  @ApiBody({ type: CompraInputDTO, description: 'Datos de la compra'})
  @Post()//Descontar el carrito de compras del stock
  @Roles('usuario', 'invitado')
  @Permisos('descontar-stock')
  @UseGuards(PermisosGuard)
  async actualizarStock(@Req() req: Request, @Body() compraInput: CompraInputDTO): Promise<any> {//Descontar el carrito de compras del stock
    this.logger.debug('Descontando stock');
    const token = req.headers.authorization?.split(' ')[1];
    const payload = this.jwtService.verify(token, { secret: '1234567' });
    const idCarrito = payload['id'];
    

    const metodosPagoAceptados = ['WebPay', 'MercadoPago', 'tárjeta de crédito'];
  if (!metodosPagoAceptados.includes(compraInput.metodoPago)) {
    this.logger.error('Método de pago no aceptado');
    throw new Error('Método de pago no aceptado');
  }

    if (!idCarrito) {
      this.logger.error('No se proporcionó ningún idCarrito');
      throw new Error('No se proporcionó ningún idCarrito');
    }

    const compraGuardada = await this.CompraService.guardarCompraEnBaseDeDatos(compraInput);
    const carritoActualizado = await this.CompraService.actualizarStock(idCarrito);
  

    return {
      compraGuardada,
      carritoActualizado,
      
    }
  }
  
}