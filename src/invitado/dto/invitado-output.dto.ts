import { ApiProperty } from '@nestjs/swagger';

export class InvitadoOutputDto {
  toDto(): any {
    throw new Error('Method not implemented.');
  }
  @ApiProperty({ description: 'ID del invitado', example: 1 })
  id: number;

  @ApiProperty({ description: 'Nombre del invitado', example: 'Juan Pérez' })
  nombre_completo: string;

  @ApiProperty({ description: 'Región del invitado', example: 'Región Metropolitana' })
  region: string;

  @ApiProperty({ description: 'Comuna del invitado', example: 'Santiago' })
  comuna: string;

  @ApiProperty({ description: 'Calle y número del invitado', example: 'Calle Falsa 123' })
  calle_y_numero: string;

  @ApiProperty({ description: 'Celular del invitado', example: '+56912345678' })
  celular: string;

  @ApiProperty({ description: 'Correo del invitado', example: 'juan.perez@example.com' })
  correo: string;

  @ApiProperty({ description: 'Información adicional del invitado', example: 'Sin información adicional', required: false })
  informacion_adicional: string;
} 