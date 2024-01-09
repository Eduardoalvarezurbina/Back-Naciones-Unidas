import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '@nestjs/jwt';
import { UsuarioModule } from './usuario.module';
import { ProductoEntity } from 'src/entity/producto.entity';
import { CajaEntity } from 'src/entity/caja.entity';

import { InvitadoEntity } from 'src/entity/invitado.entity';
import { UsuarioEntity } from 'src/entity/usuario.entity';
import { CarroDeComprasEntity } from 'src/entity/carro-de-compras.entity';
import { CompraController } from '../controller/compra.controller';
import { CompraService } from '../service/compra.service';
import { CompraEntity } from '../entity/compra.entity';
import { CarroDeComprasModule } from 'src/module/carro-de-compras.module';

@Module({
  imports: [
    UsuarioModule, CarroDeComprasModule,
    JwtModule,
    TypeOrmModule.forFeature([ProductoEntity, CajaEntity, CarroDeComprasEntity,InvitadoEntity,UsuarioEntity, CompraEntity]), // Agrega los entities al arreglo forFeature()
  ],
  controllers: [CompraController],
  providers: [CompraService],
})
export class CompraModule {}