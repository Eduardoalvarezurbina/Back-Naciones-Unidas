import { ApiProperty } from '@nestjs/swagger';

export class UsuarioDto {
  @ApiProperty({ description: 'El nombre del usuario', example: 'Juan Quezada' })
  nombreCompleto: string;

  @ApiProperty({ description: 'El rut del usuario', example: '18294255-8' })
  rut: string;

  @ApiProperty({ description: 'El celular del usuario', example: '+56912345678' })
  celular: string;

  @ApiProperty({ description: 'La región del usuario', example: 'Región Metropolitana' })
  region: string;

  @ApiProperty({ description: 'La comuna del usuario', example: 'Santiago' })
  comuna: string;

  @ApiProperty({ description: 'El correo electrónico del usuario', example: 'juan.perez@example.com' })
  correo: string;

  @ApiProperty({ description: 'La dirección del usuario', example: 'Calle Falsa 123, Santiago' })
  direccion: string;

  @ApiProperty({ description: 'Las referencias del usuario', example: 'Cerca del metro Los Héroes' })
  referencias: string;

  @ApiProperty({ description: 'La contraseña del usuario', example: 'passwordSegura123' })
  password: string;

  @ApiProperty({ description: 'Confirmación de la contraseña del usuario', example: 'passwordSegura123' })
  confirmarPassword: string;
}   