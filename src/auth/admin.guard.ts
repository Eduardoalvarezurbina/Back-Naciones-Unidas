import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> { // Determinar si se permite o no el acceso
    const request = context.switchToHttp().getRequest(); // Obtener el objeto de solicitud de la solicitud HTTP
    const token = request.headers.authorization?.split(' ')[1]; // Obtener el token de autorización del encabezado de la solicitud

    if (!token) {
      throw new UnauthorizedException('No se proporcionó un token de autenticación'); // Lanzar una excepción si no se proporciona un token
    }

    try {
      //console.log(token);
      const decodedToken = await this.jwtService.verifyAsync(token, { secret: '1234567' }); // Verificar y decodificar el token utilizando el servicio JwtService
      //console.log("decodedToken", decodedToken);
      const usuario = decodedToken.correo; // Obtener el correo electrónico del usuario del token decodificado

      if (usuario === 'admin@gmail.com') {
        return true; // Si el correo electrónico coincide con el administrador, permitir el acceso
      }

      throw new UnauthorizedException('No tienes permisos de administrador'); // Lanzar una excepción si el usuario no tiene permisos de administrador
    } catch (error) {
      console.log("Error al verificar el token:", error); // Registrar el error al verificar el token
      throw new UnauthorizedException('Token de autenticación de administrador inválido'); // Lanzar una excepción si el token de autenticación de administrador es inválido
    }
  }
}