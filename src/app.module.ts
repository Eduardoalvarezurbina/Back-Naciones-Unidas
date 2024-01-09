import { Module } from '@nestjs/common';

import { CarroDeComprasModule } from './module/carro-de-compras.module';
import { LoginModule } from './module/login.module';
import { SuscripcionModule } from './module/suscripcion.module';
import { CajaModule } from './module/caja.module';
import { InvitadoModule } from './module/invitado.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitadoEntity } from './entity/invitado.entity';
import { ProductoModule } from './module/producto.module';
import { UsuarioService } from './service/usuario.service';
import { UsuarioController } from './controller/usuario.controller';
import { UsuarioEntity } from './entity/usuario.entity';
import { ProductoEntity } from './entity/producto.entity';
import { CarroDeComprasEntity } from './entity/carro-de-compras.entity';
import { CajaEntity } from './entity/caja.entity';
import { CompraEntity } from './entity/compra.entity';
import { CompraModule } from './module/compra.module';
import { UsuarioModule } from './module/usuario.module';
import { SuscripcionEntity } from './entity/suscripcion.entity';
import {ComentarioEntity } from './entity/comentario.entity';
import { ComentarioModule } from './module/comentario.module';
//import { ProductoRepository } from './producto/producto.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'clave123',
      database: 'picoteo',
      entities: [InvitadoEntity, UsuarioEntity, ProductoEntity, CarroDeComprasEntity, CajaEntity, ProductoEntity, CompraEntity, SuscripcionEntity, ComentarioEntity],
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
    ProductoModule,
    InvitadoModule,
    CajaModule,
    SuscripcionModule,
    UsuarioModule,
    CarroDeComprasModule,
    LoginModule,
    SuscripcionModule,
    CompraModule,
    ComentarioModule,
  ],
  controllers: [UsuarioController],
  providers: [],
})
export class AppModule {}
