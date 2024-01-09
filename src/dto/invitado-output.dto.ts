import { ApiProperty } from '@nestjs/swagger';

export class InvitadoOutputDto {
  
  @ApiProperty({ description: 'ID del invitado', example: 1 })
  id: number;

  @ApiProperty({ description: 'Nombre del invitado', example: 'Juan' })
  nombreCompleto: string;

  @ApiProperty({ description: 'Apellido del invitado', example: 'Perez' })
  rut: string;

  @ApiProperty({ description: 'Región del invitado', example: 'Región Metropolitana' })
  region: string;

  @ApiProperty({ description: 'Correo del invitado', example: 'Juanp@gmail.com' })
  correo: string;

  @ApiProperty({ description: 'Comuna del invitado', example: 'Santiago' })
  comuna: string;

  @ApiProperty({ description: 'Calle y número del invitado', example: 'Calle Falsa 123' })
  direccion: string;

  @ApiProperty({ description: 'Celular del invitado', example: '+56912345678' })
  celular: string;

  @ApiProperty({ description: 'Información adicional del invitado', example: 'Sin información adicional', required: false })
  referencia: string;
} 