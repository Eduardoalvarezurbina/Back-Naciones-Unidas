import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CajaEntity } from './caja.entity';
import { CajaController } from './caja.controller';
import { CajaService } from './caja.service';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [UsuarioModule, JwtModule, TypeOrmModule.forFeature([CajaEntity])],
  controllers: [CajaController],
  providers: [CajaService],
})
export class CajaModule {}