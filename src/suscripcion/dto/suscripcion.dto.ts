import { ApiProperty } from '@nestjs/swagger';

export class SuscripcionDto {
  @ApiProperty({ description: 'Nombre de la suscripción', example: 'Suscripción mensual' })
  nombre: string;
}

export class SuscripcionInputDto {
  @ApiProperty({ description: 'Nombre de la suscripción', example: 'Suscripción mensual' })
  nombre: string;

  @ApiProperty({ description: 'Correo electrónico del suscriptor', example: 'ejemplo@correo.com' })
  email: string;
}

export class SuscripcionOutputDto {
  @ApiProperty({ description: 'ID de la suscripción', example: 1 })
  id: number;

  @ApiProperty({ description: 'Nombre de la suscripción', example: 'Suscripción mensual' })
  nombre: string;

  @ApiProperty({ description: 'Correo electrónico del suscriptor', example: 'ejemplo@correo.com' })
  email: string;

  @ApiProperty({ description: 'Fecha de inicio de la suscripción', example: '2022-01-01T00:00:00.000Z' })
  fechaInicio: Date;

  @ApiProperty({ description: 'Fecha de fin de la suscripción', example: '2022-12-31T23:59:59.999Z' })
  fechaFin: Date;
}