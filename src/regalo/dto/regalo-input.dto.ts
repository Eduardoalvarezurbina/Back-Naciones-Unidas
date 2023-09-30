import { ApiProperty } from '@nestjs/swagger';

export class RegaloInputDto {
  @ApiProperty({ description: 'Nombre del regalo', example: 'Caja de chocolates' })
  nombre: string;

  @ApiProperty({ description: 'Descripción del regalo', example: 'Una caja de chocolates variados' })
  descripcion: string;

  @ApiProperty({ description: 'Precio del regalo', example: 10.99 })
  precio: number;
}