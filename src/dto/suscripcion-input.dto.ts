import { ApiProperty } from '@nestjs/swagger';

export class SuscripcionInputDto {

  @ApiProperty({ description: 'ID del usuario', example: '1', required: false })
  idUsuario?: number;

  @ApiProperty({ description: 'ID del invitado', example: '1', required: false })
  idInvitado?: number;

  @ApiProperty({ description: 'Meses que dura la suscripcion', example: '12' })
  mesesDuracion: number;
}