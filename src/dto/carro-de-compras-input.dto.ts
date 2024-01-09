import { ApiProperty } from '@nestjs/swagger';

export class CarroDeComprasInputDto {
  @ApiProperty({ type: [Number], description: 'IDs de los productos' })
  idProducto: number[];

  @ApiProperty({ type: [Number], description: 'Cantidades de los productos' })
  cantidadProducto: number[];

  @ApiProperty({ type: [Number], description: 'IDs de las cajas' })
  idCaja: number[];

  @ApiProperty({ type: [Number], description: 'Cantidades de las cajas' })
  cantidadCaja: number[];
}