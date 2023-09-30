import { ApiProperty } from '@nestjs/swagger';

export class RegaloOutputDto {
  @ApiProperty({ description: 'ID de caja regalo', example: 1 })
  id: number;

  @ApiProperty({ description: 'Nombre de caja regalo', example: 'Caja de chocolates' })
  nombre: string;

  @ApiProperty({ description: 'Descripción de caja regalo', example: 'Una caja sorpresa' })
  descripcion: string;

  @ApiProperty({ description: 'Precio de caja de regalo', example: 30 })
  precio: number;
}