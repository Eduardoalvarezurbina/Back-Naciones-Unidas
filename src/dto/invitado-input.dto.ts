import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InvitadoInputDto {
  
  @ApiProperty({ description: 'Nombre del invitado', example: 'Jorge' })
  @IsString()
  nombreCompleto: string;

  @ApiProperty({ description: 'Apellido del invitado', example: '20112344-5' })
  @IsString()
  rut: string;

  @ApiProperty({ description: 'Región del invitado', example: 'Región Metropolitana' })
  @IsString()
  region: string;

  @ApiProperty({ description: 'Correo del invitado', example: 'Jorge122@gmail.com' })
  @IsString()
  correo: string;

  @ApiProperty({ description: 'Comuna del invitado', example: 'Santiago' })
  @IsString()
  comuna: string;

  @ApiProperty({ description: 'Calle y número del invitado', example: 'Calle Falsa 123' })
  @IsString()
  direccion: string;

  @ApiProperty({ description: 'Celular del invitado', example: '+56912345678' })
  @IsString()
  celular: string;

  @ApiProperty({ description: 'Interseccion, condominio, etc', example: 'Condiminio ABC', required: false })
  @IsString()
  @IsOptional()
  referencia: string;
}