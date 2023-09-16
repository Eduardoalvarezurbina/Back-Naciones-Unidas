import { Module } from '@nestjs/common';
import { PaginaDeInicioModule } from './pagina-de-inicio/pagina-de-inicio.module';
import { UsuarioModule } from './usuario/usuario.module';
import { CarroDeComprasModule } from './carro-de-compras/carro-de-compras.module';
import { FooterModule } from './footer/footer.module';
import { ComunidadModule } from './comunidad/comunidad.module';
import { CatalogoDeProductosModule } from './catalogo-de-productos/catalogo-de-productos.module';
import { AdministracionModule } from './administracion/administracion.module';
import { CajasMisteriosasModule } from './cajas-misteriosas/cajas-misteriosas.module';
import { SuscripcionModule } from './suscripcion/suscripcion.module';
import { CajasDelMesModule } from './cajas-del-mes/cajas-del-mes.module';
import { RegaloController } from './regalo/regalo.controller';
import { RegaloModule } from './regalo/regalo.module';

@Module({
  imports: [CajasDelMesModule,CajasMisteriosasModule,SuscripcionModule, PaginaDeInicioModule, UsuarioModule, CarroDeComprasModule, FooterModule, ComunidadModule, CatalogoDeProductosModule, AdministracionModule, CajasMisteriosasModule, SuscripcionModule, CajasDelMesModule, RegaloModule],
  controllers: [RegaloController],
  providers: [],
})
export class AppModule {}
