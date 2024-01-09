import { Controller, Post, Body, Get, Logger } from '@nestjs/common';
import { LoginService } from '../service/login.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';


@ApiTags('Login')
@Controller('login')
export class LoginController {
  private readonly logger = new Logger(LoginController.name);
  constructor(private LoginService: LoginService) {}

  @ApiBody({ description: 'Datos de inicio de sesión del usuario', type: LoginDto })
  @ApiResponse({ status: 200, description: 'El usuario ha iniciado sesión correctamente.' })
  @ApiResponse({ status: 401, description: 'Credenciales no válidas.' })
  @ApiOperation({ summary: 'Iniciar sesión' })
  @Post() 
  async login(@Body() body: LoginDto) {
    this.logger.debug('Iniciando sesión');
    try {
      const user = await this.LoginService.validateUser(body.email, body.password); // Validar las credenciales del usuario utilizando el servicio AuthService
      if (user) {
        this.logger.debug('Usuario autenticado');
        return this.LoginService.login(user); // Generar un token de acceso utilizando el servicio AuthService y devolverlo como respuesta
      }
      return null;
    } catch (error) {
      this.logger.error('Error al iniciar sesión');
      const errorMessage = 'Ocurrió un error durante el inicio de sesión.';
      console.error(errorMessage, error);
      return errorMessage;
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Se ha obtenido la pantalla de autenticación correctamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  @ApiOperation({ summary: 'Obtener la pantalla de autenticación' })
  getPantalla(): string {
    return 'Login';
  }
}