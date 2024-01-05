import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private usuarioService: UsuarioService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> { //para determinar si se permite o no el acceso
    const request = context.switchToHttp().getRequest(); // Obtiene el objeto de solicitud de la solicitud HTTP
    const token = request.headers.authorization?.split(' ')[1]; // Obtiene el token sin el prefijo "Bearer"

    if (!token) {
      throw new UnauthorizedException('No se proporcionó un token de autenticación'); 
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: '1234567' }); // Verifica el token utilizando el servicio JwtService
      //console.log("payload", payload); 
      const usuario = await this.usuarioService.findOneByCorreo(payload.correo); // Obtiene el usuario correspondiente al correo electrónico del token
      request['INFO'] = { payload, nombreUsuario: usuario.nombre }; // Agrega información adicional al objeto de solicitud
    } catch (error) {
      console.log("Error al verificar el token:", error); // Registra el error al verificar el token
      throw new UnauthorizedException("Token inválido"); // Lanza una excepción si el token es inválido
    }

    return true; // Permite el acceso si el token es válido
  }
}