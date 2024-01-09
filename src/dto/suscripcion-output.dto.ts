import { ApiProperty } from '@nestjs/swagger';

export class SuscripcionOutputDto {
  @ApiProperty({ description: 'Nombre de la suscripción', example: 'Suscripción mensual' })
  nombre: string;

 @ApiProperty({ description: 'Meses que dura la suscripcion', example: '12' })
  mesesDuracion: number;

  @ApiProperty({ description: 'Fecha de inicio de la suscripción', example: '2022-01-01' })
  fechaInicio: Date;

  @ApiProperty({ description: 'Fecha de fin de la suscripción', example: '2022-12-31' })
  fechaFin: Date;
}