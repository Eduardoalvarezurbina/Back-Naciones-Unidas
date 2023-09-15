import { Module } from '@nestjs/common';
import { PopUpModule } from './pop-up/pop-up.module';
import { PopUpController } from './pop-up/pop-up.controller';
import { PaginaDeInicioModule } from './pagina-de-inicio/pagina-de-inicio.module';
import { UsuarioModule } from './usuario/usuario.module';
import { CarroDeComprasModule } from './carro-de-compras/carro-de-compras.module';
import { FooterModule } from './footer/footer.module';
import { ComunidadModule } from './comunidad/comunidad.module';
import { CatalogoDeProductosModule } from './catalogo-de-productos/catalogo-de-productos.module';
import { AdministracionModule } from './administracion/administracion.module';

@Module({
  imports: [PopUpModule, PaginaDeInicioModule, UsuarioModule, CarroDeComprasModule, FooterModule, ComunidadModule, CatalogoDeProductosModule, AdministracionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
