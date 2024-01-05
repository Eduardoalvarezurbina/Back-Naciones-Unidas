import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  // Método para validar las credenciales de un usuario
  async validateUser(correo: string, pass: string): Promise<any> {
    const user: any = await this.usuarioService.findOneByCorreo(correo); // Busca un usuario por su correo electrónico
    if (user && (pass == user.passwordHash)) { // Valida la contraseña
      const { passwordHash, ...result } = user; // Elimina la contraseña de los datos del usuario
      return result; // Retorna los datos del usuario sin la contraseña
    } else {
      throw new UnauthorizedException('Usuario o contraseña incorrecta');
    }
  }

  // Método para generar un token JWT al iniciar sesión
  async login(user: any) {
    const payload = { correo: user.correo };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' }); // Genera un token con una duración de 1 hora
    return {
      access_token: token, // Retorna el token de acceso
    };
  }
}