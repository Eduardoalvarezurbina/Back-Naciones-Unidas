import { ApiProperty } from '@nestjs/swagger';

export class RegaloInputDto {
  @ApiProperty({ description: 'Nombre del regalo', example: 'Caja de regalo EEUU' })
  nombre: string;

  @ApiProperty({ description: 'Descripción del regalo', example: 'Caja de regalo gringa' })
  descripcion: string;

  @ApiProperty({ description: 'Precio del regalo', example: 59990 })
  precio: number;
}