import { ApiProperty } from '@nestjs/swagger';

export class SuscripcionInputDto {

  @ApiProperty({ description: 'Meses que dura la suscripcion', example: '12' })
  mesesDuracion: number;
}