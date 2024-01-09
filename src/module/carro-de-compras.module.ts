import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarroDeComprasController } from '../controller/carro-de-compras.controller';
import { CarroDeComprasService } from '../service/carro-de-compras.service';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioModule } from './usuario.module';
import { ProductoEntity } from 'src/entity/producto.entity';
import { CajaEntity } from 'src/entity/caja.entity';
import { CarroDeComprasEntity } from '../entity/carro-de-compras.entity';
import { InvitadoEntity } from 'src/entity/invitado.entity';
import { UsuarioEntity } from 'src/entity/usuario.entity';

@Module({
  imports: [
    UsuarioModule,
    JwtModule,
    TypeOrmModule.forFeature([ProductoEntity, CajaEntity, CarroDeComprasEntity,InvitadoEntity,UsuarioEntity]), // Agrega los entities al arreglo forFeature()
  ],
  controllers: [CarroDeComprasController],
  providers: [CarroDeComprasService],
  exports: [CarroDeComprasService], // Exporta CarroDeComprasService para que otros módulos puedan usarlo
})
export class CarroDeComprasModule {}