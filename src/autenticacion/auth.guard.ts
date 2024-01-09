import { Injectable, ExecutionContext, UnauthorizedException, CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest(); //obtiene el request
    const token = request.headers.authorization?.split(' ')[1]; //Extrae el token de los headers

    if (!token) { //si no hay token lanza una excepción
      throw new UnauthorizedException('No se proporcionó un token de autenticación');
    }
  
    try {
      const decodedToken = await this.jwtService.verifyAsync(token, { secret: '1234567' });
      const usuario = decodedToken.correo; // decodifica el token y obtiene el correo del usuario

      let rolesUsuario = [];
      if (usuario === 'admin@gmail.com') {
        rolesUsuario.push('administrador', 'usuario'); //se le asignan los 2 roles
      } else if (usuario) {
        rolesUsuario.push('usuario');
      } else if (decodedToken.invitado) {
        rolesUsuario.push('invitado');
      }

      
      request.rolesUsuario = rolesUsuario; // Almacena los roles del usuario en el objeto request
      return true; //retorna true si el usuario está autenticado

    } catch (error) {
      console.log('Error:', error); // Imprime el error
      throw new UnauthorizedException('Inicia sesión para continuar');
    }
  }
}