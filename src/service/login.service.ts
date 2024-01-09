import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from './usuario.service';
import { log } from 'console';


@Injectable()
export class LoginService {
  private readonly logger = new Logger(LoginService.name);
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  // Método para validar las credenciales de un usuario
  async validateUser(correo: string, pass: string): Promise<any> {
    this.logger.debug('Validando usuario');
    const user: any = await this.usuarioService.findOneByCorreo(correo); // Busca un usuario por su correo electrónico
    if (user && (pass == user.passwordHash)) { // Valida la contraseña
      const { passwordHash, ...result } = user; // Elimina la contraseña de los datos del usuario
      return result; // Retorna los datos del usuario sin la contraseña
    } else {
      this.logger.warn('Usuario o contraseña incorrecta');
      throw new UnauthorizedException('Usuario o contraseña incorrecta');
    }
  }

  // Método para generar un token JWT al iniciar sesión
  async login(user: any) {  
    this.logger.debug('Generando token de acceso');
    const payload = { id:user.id, correo: user.correo };
    const secretKey = '1234567'; // Utiliza la misma clave secreta para firmar y verificar el token
    const token = await this.jwtService.sign(payload, { secret: secretKey, expiresIn: '1h' }); // Genera un token con una duración de 1 hora
    return {
      access_token: token, // Retorna el token de acceso
    };
  }
  
}