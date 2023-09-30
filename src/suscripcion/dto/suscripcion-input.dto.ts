import { ApiProperty } from '@nestjs/swagger';

export class SuscripcionInputDto {
  @ApiProperty({ description: 'Nombre de la suscripción', example: 'Suscripción mensual de caja' })
  nombre: string;

  @ApiProperty({ description: 'Correo electrónico del suscriptor', example: 'ejemplo@correo.com' })
  email: string;
}