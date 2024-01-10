import { ApiProperty } from '@nestjs/swagger';

export class ProductoInputDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Vino Santa Helena 1 litro',
  })
  readonly nombreProducto: string;

  @ApiProperty({
    description: 'Descripción del producto',
    example: 'Vino blanco de 1 litro',
  })
  readonly descripcion: string;

  @ApiProperty({
    description: 'Clasificación del producto',
    example: 'Vino',
  })
  readonly clasificacion: string;

  @ApiProperty({
    description: 'SKU del producto',
    example: '123456',
  })
  readonly sku: string;

  @ApiProperty({ 
    description: 'Precio del producto',
    example: 1990,
  })
  readonly precio: number;

  @ApiProperty({
    description: 'Cantidad que se agregara al stock del producto',
    example: 10,
  })
  readonly cantidad: number;

  @ApiProperty({
    description: 'Imagen principal del producto',
    example: '',
  })
  readonly imagen1: string;

  @ApiProperty({
    description: 'Imagen opcional del producto',
    example: '',
    required: false,
  })
  readonly imagen2?: string;

  @ApiProperty({
    description: 'Imagen opcional del producto',
    example: '',
    required: false,
  })
  readonly imagen3?: string;
}