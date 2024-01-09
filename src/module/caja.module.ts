import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CajaEntity } from '../entity/caja.entity';
import { CajaController } from '../controller/caja.controller';
import { CajaService } from '../service/caja.service';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioModule } from './usuario.module';
import { CarroDeComprasEntity } from 'src/entity/carro-de-compras.entity';
import { InvitadoEntity } from 'src/entity/invitado.entity';
import { ProductoEntity } from 'src/entity/producto.entity';
import { UsuarioEntity } from 'src/entity/usuario.entity';

@Module({
  imports: [UsuarioModule, JwtModule, TypeOrmModule.forFeature([CajaEntity, UsuarioEntity, InvitadoEntity, CarroDeComprasEntity, ProductoEntity])],
  controllers: [CajaController],
  providers: [CajaService],
})
export class CajaModule {}