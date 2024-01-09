import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'juan.perez@example.com', description: 'El correo electrónico del usuario' })
  email: string;

  @ApiProperty({ example: 'passwordSegura123', description: 'La contraseña del usuario' })
  password: string;
}