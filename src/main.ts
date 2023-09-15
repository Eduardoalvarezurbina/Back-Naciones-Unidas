import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AdministracionModule } from './administracion/administracion.module';
import { CarroDeComprasModule } from './carro-de-compras/carro-de-compras.module';
import { CatalogoDeProductosModule } from './catalogo-de-productos/catalogo-de-productos.module';
import { ComunidadModule } from './comunidad/comunidad.module';
import { FooterModule } from './footer/footer.module';
import { PaginaDeInicioModule } from './pagina-de-inicio/pagina-de-inicio.module';
import { PopUpModule } from './pop-up/pop-up.module';
import { UsuarioModule } from './usuario/usuario.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const nombreProyecto = process.env.npm_package_name;
  const versionProyecto =process.env.npm_package_version;
 

let documentBuilder =new DocumentBuilder()
  .setTitle(nombreProyecto)
  .setVersion(versionProyecto)
  .setDescription("Página web Naciones Unidas")
  .setContact("Eduardo Alvarez", "http://google.com", "Eduardoalvarezurbina94@gmail.com")
  .build();

let documentBuilderAdministracion =new DocumentBuilder()
  .setTitle("Documentación de la API - Administración")
  .setVersion(versionProyecto)
  .setDescription("Página web Naciones Unidas")
  .setContact("Eduardo Alvarez", "http://google.com", "Eduardoalvarezurbina94@gmail.com")
  .build();

let documentBuilderCarrodecompras =new DocumentBuilder()
  .setTitle("Documentación de la API - Carro de compras")
  .setVersion(versionProyecto)
  .setDescription("Página web Naciones Unidas")
  .setContact("Eduardo Alvarez", "http://google.com", "Eduardoalvarezurbina94@gmail.com")
  .build();

let documentBuilderCatalogodeproductos =new DocumentBuilder()
  .setTitle("Documentación de la API - Catálogo de productos")
  .setVersion(versionProyecto)
  .setDescription("Página web Naciones Unidas")
  .setContact("Eduardo Alvarez", "http://google.com", "Eduardoalvarezurbina94@gmail.com")
  .build();

let documentBuilderComunidad =new DocumentBuilder()
  .setTitle("Documentación de la API - Comunidad")
  .setVersion(versionProyecto)
  .setDescription("Página web Naciones Unidas")
  .setContact("Eduardo Alvarez", "http://google.com", "Eduardoalvarezurbina94@gmail.com")
  .build();  

let documentBuilderFooter =new DocumentBuilder()
  .setTitle("Documentación de la API - Footer")
  .setVersion(versionProyecto)
  .setDescription("Página web Naciones Unidas")
  .setContact("Eduardo Alvarez", "http://google.com", "Eduardoalvarezurbina94@gmail.com")
  .build();

let documentBuilderPaginadeinicio =new DocumentBuilder()
  .setTitle("Documentación de la API - Página de inicio")
  .setVersion(versionProyecto)
  .setDescription("Página web Naciones Unidas")
  .setContact("Eduardo Alvarez", "http://google.com", "Eduardoalvarezurbina94@gmail.com")
  .build();

let documentBuilderPopup =new DocumentBuilder()
  .setTitle("Documentación de la API - Pop-up")
  .setVersion(versionProyecto)
  .setDescription("Página web Naciones Unidas")
  .setContact("Eduardo Alvarez", "http://google.com", "Eduardoalvarezurbina94@gmail.com")
  .build();

let documentBuilderUsuario =new DocumentBuilder()
  .setTitle("Documentación de la API - Usuario")
  .setVersion(versionProyecto)
  .setDescription("Página web Naciones Unidas")
  .setContact("Eduardo Alvarez", "http://google.com", "Eduardoalvarezurbina94@gmail.com")
  .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  const documentAdministracion= SwaggerModule.createDocument(app, documentBuilderAdministracion, {
    include: [AdministracionModule]
  });
  const documentCarrodecompras= SwaggerModule.createDocument(app, documentBuilderCarrodecompras, {
    include: [CarroDeComprasModule]
  });
  const documentCatalogodeproductos= SwaggerModule.createDocument(app, documentBuilderCatalogodeproductos, {
    include: [CatalogoDeProductosModule]
  });
  const documentComunidad= SwaggerModule.createDocument(app, documentBuilderComunidad, {
    include: [ComunidadModule]
  });
  const documentFooter= SwaggerModule.createDocument(app, documentBuilderFooter, {
    include: [FooterModule]
  });
  const documentPaginadeinicio= SwaggerModule.createDocument(app, documentBuilderPaginadeinicio, {
    include: [PaginaDeInicioModule]
  });
  const documentPopup= SwaggerModule.createDocument(app, documentBuilderPopup, {
    include: [PopUpModule]
  });
  const documentUsuario= SwaggerModule.createDocument(app, documentBuilderUsuario, {
    include: [UsuarioModule]
  });

  SwaggerModule.setup ('documentacion', app, document); 
  SwaggerModule.setup ('Administracion', app, documentAdministracion);
  SwaggerModule.setup ('carrodecompras', app, documentCarrodecompras);
  SwaggerModule.setup ('Catalogodeproductos', app, documentCatalogodeproductos);
  SwaggerModule.setup ('comunidad', app, documentComunidad);
  SwaggerModule.setup ('footer', app, documentFooter);
  SwaggerModule.setup ('paginadeinicio', app, documentPaginadeinicio);
  SwaggerModule.setup ('popup', app, documentPopup);
  SwaggerModule.setup ('usuario', app, documentUsuario);

  await app.listen(3000);
}
bootstrap();
