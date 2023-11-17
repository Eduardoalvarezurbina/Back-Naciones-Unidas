import { Controller, Post, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CarroDeComprasService } from './carro-de-compras.service';

@ApiTags('Carro de compras')
@Controller('carro-de-compras')
export class CarroDeComprasController {
  constructor(private carroDeComprasService: CarroDeComprasService) {}

  @Post(':idCarro/agregar-producto/:idProducto')
  @ApiOperation({ summary: 'Agregar un producto al carro de compras' })
  @ApiParam({ name: 'idCarro', description: 'ID del carro de compras' })
  @ApiParam({ name: 'idProducto', description: 'ID del producto a agregar' })
  agregarProducto(
    @Param('idCarro') idCarro: number,
    @Param('idProducto') idProducto: number,
  ) {
    return this.carroDeComprasService.agregarProducto(idCarro, idProducto);
  }
}