import { ApiProperty } from '@nestjs/swagger';
import { LoginDto } from './login.dto';

export class CarroDeComprasInputDto {
  @ApiProperty({type: [Number], description: 'IDs de los productos', example: [1, 2, 3]})
  idProducto: number[];

  @ApiProperty({type: [Number], description: 'Cantidades de los productos', example: [5, 10, 15]})
  cantidadProducto: number[];

  @ApiProperty({type: [Number], description: 'IDs de las cajas',example: [4, 5, 6]})
  idCaja: number[];

  @ApiProperty({ type: [Number], description: 'Cantidades de las cajas', example: [2, 3, 4]})
  cantidadCaja: number[];
}

/*asi deberian recibirse en el input pero me arroja error al cambiar este LoginDto
[
  {
    "idProducto": [61, 62, 63],
    "cantidadProducto": [1, 2, 2]
  },
  {
    "idCaja": [2],
    "cantidadCaja": [1]
  }
]*/