import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { CarroDeComprasModule } from './carro-de-compras/carro-de-compras.module';
import { AuthModule } from './auth/auth.module';
import { SuscripcionModule } from './suscripcion/suscripcion.module';
import { CajasDelMesModule } from './cajas-del-mes/cajas-del-mes.module';
import { InvitadoModule } from './invitado/invitado.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitadoEntity } from './invitado/invitado.entity';
import { ProductoModule } from './producto/producto.module';
import { UsuarioService } from './usuario/usuario.service';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioEntity } from './usuario/usuario.entity';

@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port:3306,
      username: 'root',
      password: 'clave123',
      database: 'picoteo',      
      entities: [InvitadoEntity,UsuarioEntity],
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),    
      
      ProductoModule, InvitadoModule, CajasDelMesModule,SuscripcionModule, UsuarioModule, CarroDeComprasModule, AuthModule, SuscripcionModule, CajasDelMesModule],
  controllers: [UsuarioController],
  providers: [],
})
export class AppModule {}
