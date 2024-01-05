// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioService } from '../usuario/usuario.service'; 
import { UsuarioModule } from '../usuario/usuario.module'; 
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsuarioModule, 
    JwtModule.register({
      secret: '1234567',
      signOptions: { expiresIn: '1h' }, // duración de sesión
    }),
  ],
  providers: [AuthService, UsuarioService],
  controllers: [AuthController],
  exports: [AuthService], 
})
export class AuthModule {}