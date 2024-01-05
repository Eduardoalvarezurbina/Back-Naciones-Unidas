import { ApiProperty } from '@nestjs/swagger';

export class CajaDto {
  @ApiProperty()
  nombre: string;

  @ApiProperty()
  precio: number;

  @ApiProperty()
  clasificacion: string;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  cantidad: number;

  @ApiProperty()
  descripcion: string;

  @ApiProperty()
  imagen1: string;

  @ApiProperty({ required: false })
  imagen2?: string;

  @ApiProperty({ required: false })
  imagen3?: string;

  @ApiProperty({ type: [String], minItems: 3 })
  productosIncluidos: string[];

  @ApiProperty({ type: [String], minItems: 0, maxItems: 3, required: false })
  productosOpcionales?: string[];
}