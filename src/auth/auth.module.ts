// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioService } from '../usuario/usuario.service'; 
import { UsuarioModule } from '../usuario/usuario.module'; 
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants'; // Asegúrate de que la ruta es correcta

@Module({
  imports: [
    UsuarioModule, 
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' }, // Ajusta esto según tus necesidades
    }),
  ],
  providers: [AuthService, UsuarioService],
  controllers: [AuthController],
  exports: [AuthService], 
})
export class AuthModule {}