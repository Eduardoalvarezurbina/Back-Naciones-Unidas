import { ApiProperty } from '@nestjs/swagger';

export class CajasmisteriosasInputDto {
  @ApiProperty({ description: 'Nombre de la caja misteriosa', example: 'Caja misteriosa 4' })
  nombre: string;

  @ApiProperty({ description: 'Descripción de la caja misteriosa', example: 'Descripción de la caja misteriosa 4' })
  descripcion: string;

  @ApiProperty({ description: 'Precio de la caja misteriosa', example: 40.99 })
  precio: number;
}