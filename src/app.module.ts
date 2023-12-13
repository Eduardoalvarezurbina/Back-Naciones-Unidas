import { Module } from '@nestjs/common';
import { PaginaDeInicioModule } from './pagina-de-inicio/pagina-de-inicio.module';
import { UsuarioModule } from './usuario/usuario.module';
import { CarroDeComprasModule } from './carro-de-compras/carro-de-compras.module';
import { AuthModule } from './auth/auth.module';
import { ComunidadModule } from './comunidad/comunidad.module';
import { CatalogoDeProductosModule } from './catalogo-de-productos/catalogo-de-productos.module';
import { AdministracionModule } from './administracion/administracion.module';
import { CajasMisteriosasModule } from './cajas-misteriosas/cajas-misteriosas.module';
import { SuscripcionModule } from './suscripcion/suscripcion.module';
import { CajasDelMesModule } from './cajas-del-mes/cajas-del-mes.module';
import { RegaloController } from './regalo/regalo.controller';
import { RegaloModule } from './regalo/regalo.module';
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
      
      ProductoModule, InvitadoModule, CajasDelMesModule,CajasMisteriosasModule,SuscripcionModule, PaginaDeInicioModule, UsuarioModule, CarroDeComprasModule, AuthModule, ComunidadModule, CatalogoDeProductosModule, AdministracionModule, CajasMisteriosasModule, SuscripcionModule, CajasDelMesModule, RegaloModule],
  controllers: [RegaloController,UsuarioController],
  providers: [],
})
export class AppModule {}
