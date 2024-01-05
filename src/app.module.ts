import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { CarroDeComprasModule } from './carro-de-compras/carro-de-compras.module';
import { AuthModule } from './auth/auth.module';
import { SuscripcionModule } from './suscripcion/suscripcion.module';
import { CajaModule } from './caja/caja.module';
import { InvitadoModule } from './invitado/invitado.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitadoEntity } from './invitado/invitado.entity';
import { ProductoModule } from './producto/producto.module';
import { UsuarioService } from './usuario/usuario.service';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioEntity } from './usuario/usuario.entity';
import { ProductoEntity } from './producto/producto.entity';
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
      entities: [InvitadoEntity, UsuarioEntity, ProductoEntity],
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
    AuthModule,
    SuscripcionModule,
  ],
  controllers: [UsuarioController],
  providers: [],
})
export class AppModule {}
