import { ApiProperty } from '@nestjs/swagger';

export class CajasDelMesOutputDto {
  @ApiProperty({ description: 'ID de la caja del mes', example: 1 })
  id: number;

  @ApiProperty({ description: 'Nombre de la caja del mes', example: 'Caja Navideña' })
  nombre: string;

  @ApiProperty({ description: 'Descripción de la caja del mes', example: 'Una caja llena de sorpresas navideñas' })
  descripcion: string;

  @ApiProperty({ description: 'Precio de la caja del mes', example: 50 })
  precio: number;
}