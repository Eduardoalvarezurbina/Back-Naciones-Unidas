import { ApiProperty } from '@nestjs/swagger';

class ProductoDto {
  @ApiProperty({ description: 'ID del producto' })
  idProducto: number;

  @ApiProperty({ description: 'Cantidad del producto' })
  cantidadProducto: number;
}

class CajaDto {
  @ApiProperty({ description: 'ID de la caja' })
  idCaja: number;

  @ApiProperty({ description: 'Cantidad de la caja' })
  cantidadCaja: number;
}

export class CarroDeComprasOutputDto {
  @ApiProperty({ description: 'ID del carrito' })
  idCarrito: number;

  @ApiProperty({ type: [ProductoDto], description: 'Productos en el carrito' })
  productos: ProductoDto[];

  @ApiProperty({ type: [CajaDto], description: 'Cajas en el carrito' })
  cajas: CajaDto[];
}