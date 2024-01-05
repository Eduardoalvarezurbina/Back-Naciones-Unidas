import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InvitadoInputDto {
  
  @ApiProperty({ description: 'Nombre del invitado', example: 'Juan Pérez' })
  @IsString()
  nombre_completo: string;

  @ApiProperty({ description: 'Región del invitado', example: 'Región Metropolitana' })
  @IsString()
  region: string;

  @ApiProperty({ description: 'Comuna del invitado', example: 'Santiago' })
  @IsString()
  comuna: string;

  @ApiProperty({ description: 'Calle y número del invitado', example: 'Calle Falsa 123' })
  @IsString()
  calle_y_numero: string;

  @ApiProperty({ description: 'Celular del invitado', example: '+56912345678' })
  @IsString()
  celular: string;

  @ApiProperty({ description: 'Correo del invitado', example: 'juan.perez@example.com' })
  @IsString()
  correo: string;

  @ApiProperty({ description: 'Información adicional del invitado', example: 'Sin información adicional', required: false })
  @IsString()
  @IsOptional()
  informacion_adicional: string;
}