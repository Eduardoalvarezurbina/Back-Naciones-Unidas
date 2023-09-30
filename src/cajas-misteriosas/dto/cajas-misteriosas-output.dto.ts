import { ApiProperty } from '@nestjs/swagger';

export class CajasmisteriosasOutputDto {
  @ApiProperty({ description: 'ID de la caja misteriosa', example: 1 })
  id: number;

  @ApiProperty({ description: 'Nombre de la caja misteriosa', example: 'Caja misteriosa 1' })
  nombre: string;

  @ApiProperty({ description: 'Descripción de la caja misteriosa', example: 'Descripción de la caja misteriosa 1' })
  descripcion: string;

  @ApiProperty({ description: 'Precio de la caja misteriosa', example: 10 })
  precio: number;
}