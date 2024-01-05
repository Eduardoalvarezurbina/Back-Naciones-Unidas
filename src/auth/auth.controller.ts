import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ description: 'Datos de inicio de sesión del usuario', type: AuthDto })
  @ApiResponse({ status: 200, description: 'El usuario ha iniciado sesión correctamente.' })
  @ApiResponse({ status: 401, description: 'Credenciales no válidas.' })
  @Post('login') //ruta
  async login(@Body() body: AuthDto) {
    try {
      const user = await this.authService.validateUser(body.email, body.password); // Validar las credenciales del usuario utilizando el servicio AuthService
      if (user) {
        return this.authService.login(user); // Generar un token de acceso utilizando el servicio AuthService y devolverlo como respuesta
      }
      return null;
    } catch (error) {
      const errorMessage = 'Ocurrió un error durante el inicio de sesión.';
      console.error(errorMessage, error);
      return errorMessage;
    }
  }

  @Get('Autenticación')
  @ApiResponse({ status: 200, description: 'Se ha obtenido la pantalla de autenticación correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiOperation({ summary: 'Obtener la pantalla de autenticación' })
  getPantalla(): string {
    return 'Login';
  }
}