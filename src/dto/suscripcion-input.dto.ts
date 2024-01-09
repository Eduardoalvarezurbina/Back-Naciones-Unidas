import { ApiProperty } from '@nestjs/swagger';

export class SuscripcionInputDto {
  @ApiProperty({ description: 'Nombre de la suscripción', example: 'Suscripción mensual de caja' })
  nombre: string;

  @ApiProperty({ description: 'Meses que dura la suscripcion', example: '12' })
  mesesDuracion: number;
}