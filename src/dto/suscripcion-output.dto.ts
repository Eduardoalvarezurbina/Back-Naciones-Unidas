import { ApiProperty } from '@nestjs/swagger';

export class SuscripcionOutputDto {

 @ApiProperty({ description: 'Meses que dura la suscripcion', example: '12' })
  mesesDuracion: number;

  @ApiProperty({ description: 'Fecha de inicio de la suscripción', example: '2024-01-01' })
  fechaInicio: Date;

  @ApiProperty({ description: 'Fecha de fin de la suscripción', example: '2024-12-31' })
  fechaFin: Date;
}