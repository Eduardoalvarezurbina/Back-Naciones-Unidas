import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ description: 'Datos de inicio de sesión del usuario', type: AuthDto })
  @ApiResponse({ status: 200, description: 'El usuario ha iniciado sesión correctamente.' })
  @ApiResponse({ status: 401, description: 'Credenciales no válidas.' })
  @Post('login')
  async login(@Body() body: AuthDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (user) {
      return this.authService.login(user);
    }
    return null;
  }

  @Get('Autenticación')
  getPantalla(): string {
    return 'Login';
  }
}