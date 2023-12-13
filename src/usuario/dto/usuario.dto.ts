import { ApiProperty } from '@nestjs/swagger';

export class RegistroDto {
  @ApiProperty()
  nombre: string;

  @ApiProperty()
  rut: string;

  @ApiProperty()
  telefono: string;

  @ApiProperty()
  correo: string;

  @ApiProperty()
  direccion: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  confirmarPassword: string;
}
