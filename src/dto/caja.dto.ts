import { ApiProperty } from '@nestjs/swagger';

export class CajaDto {
  @ApiProperty({ description: 'El nombre de la caja', example: 'Caja celebración anual' })
  nombreProducto: string;

  @ApiProperty({ description: 'El precio de la caja', example: 15000 })
  precio: number;

  @ApiProperty({ description: 'La clasificación de la caja', example: 'Alta' })
  clasificacion: string;

  @ApiProperty({ description: 'El SKU del producto', example: 'SKU1234' })
  sku: string;

  @ApiProperty({ description: 'La cantidad de la caja', example: 10 })
  cantidad: number;

  @ApiProperty({ description: 'La descripción de la caja', example: 'Esta caja se lanza una vez al año' })
  descripcion: string;


  @ApiProperty({ description: 'La primera imagen de la caja', example: 'imagen1.jpg' })
  imagen1: string;

  @ApiProperty({ description: 'La segunda imagen  (opcional)', example: 'imagen2.jpg', required: false })
  imagen2?: string;

  @ApiProperty({ description: 'La tercera imagen  (opcional)', example: 'imagen3.jpg', required: false })
  imagen3?: string;

  @ApiProperty({ description: 'Los productos incluidos', example: ['vino blanco 212', 'bebida sprite 2litros', 'mani salado 200g'], type: [String], minItems: 3 })
  productosIncluidos: string[];

  @ApiProperty({ description: 'Los productos opcionales (máximo 3)', example: ['vino tinto 3 litros'], type: [String], minItems: 0, maxItems: 3, required: false })
  productosOpcionales?: string[];
} 