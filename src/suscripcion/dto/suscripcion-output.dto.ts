import { ApiProperty } from '@nestjs/swagger';

export class SuscripcionOutputDto {
  @ApiProperty({ description: 'ID de la suscripción', example: 1 })
  id: number;

  @ApiProperty({ description: 'Nombre de la suscripción', example: 'Suscripción mensual' })
  nombre: string;

  @ApiProperty({ description: 'Correo electrónico del suscriptor', example: 'ejemplo@correo.com' })
  email: string;

  @ApiProperty({ description: 'Fecha de inicio de la suscripción', example: '2022-01-01' })
  fechaInicio: Date;

  @ApiProperty({ description: 'Fecha de fin de la suscripción', example: '2022-12-31' })
  fechaFin: Date;
}