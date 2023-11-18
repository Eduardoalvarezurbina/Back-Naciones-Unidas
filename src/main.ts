import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AdministracionModule } from './administracion/administracion.module';
import { CarroDeComprasModule } from './carro-de-compras/carro-de-compras.module';
import { CatalogoDeProductosModule } from './catalogo-de-productos/catalogo-de-productos.module';
import { ComunidadModule } from './comunidad/comunidad.module';
import { FooterModule } from './footer/footer.module';
import { PaginaDeInicioModule } from './pagina-de-inicio/pagina-de-inicio.module';
import { UsuarioModule } from './usuario/usuario.module';
import { CajasMisteriosasModule } from './cajas-misteriosas/cajas-misteriosas.module';
import { CajasDelMesModule } from './cajas-del-mes/cajas-del-mes.module';
import { SuscripcionModule } from './suscripcion/suscripcion.module';
import { RegaloModule } from './regalo/regalo.module';
import { InvitadoModule } from './invitado/invitado.module'; 
import { ProductoModule } from './producto/producto.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

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

  let documentBuilderProducto =new DocumentBuilder()
  .setTitle("Documentación de la API - Producto")
  .setVersion(versionProyecto)
  .setDescription("Página web Naciones Unidas")
  .setContact("Eduardo Alvarez", "http://google.com", "Eduardoalvarezurbina94@gmail.com")
  .build();  

let documentBuilderinvitado =new DocumentBuilder()
.setTitle("Documentación de la API - Invitados")
.setVersion(versionProyecto)
.setDescription("Página web Naciones Unidas")
.setContact("Eduardo Alvarez", "http://google.com", "Eduardoalvarezurbina94@gmail.com")
.build();

let documentBuilderCajasDelMes =new DocumentBuilder()
  .setTitle("Documentación de la API - Cajas del mes")
  .setVersion(versionProyecto)
  .setDescription("Página web Naciones Unidas")
  .setContact("Eduardo Alvarez", "http://google.com", "Eduardoalvarezurbina94@gmail.com")
  .build();

let documentBuilderCajasMisteriosas =new DocumentBuilder()
  .setTitle("Documentación de la API - Cajas Misteriosas")
  .setVersion(versionProyecto)
  .setDescription("Página web Naciones Unidas")
  .setContact("Eduardo Alvarez", "http://google.com", "Eduardoalvarezurbina94@gmail.com")
  .build();

let documentBuilderSuscripcion =new DocumentBuilder()
  .setTitle("Documentación de la API - Suscripción")
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

let documentBuilderUsuario =new DocumentBuilder()
  .setTitle("Documentación de la API - Usuario")
  .setVersion(versionProyecto)
  .setDescription("Página web Naciones Unidas")
  .setContact("Eduardo Alvarez", "http://google.com", "Eduardoalvarezurbina94@gmail.com")
  .build();

let documentBuilderRegalo =new DocumentBuilder()
  .setTitle("Documentación de la API - Regalo")
  .setVersion(versionProyecto)
  .setDescription("Página web Naciones Unidas")
  .setContact("Eduardo Alvarez", "http://google.com", "Eduardoalvarezurbina94@gmail.com")
  .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  const documentAdministracion= SwaggerModule.createDocument(app, documentBuilderAdministracion, {
    include: [AdministracionModule]
  });
  const documentCajasDelMes= SwaggerModule.createDocument(app, documentBuilderCajasDelMes, {
    include: [CajasDelMesModule]
  });
  const documentCajasMisteriosas= SwaggerModule.createDocument(app, documentBuilderCajasMisteriosas, {
    include: [CajasMisteriosasModule]
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
  const documentRegalo= SwaggerModule.createDocument(app, documentBuilderRegalo, {
    include: [RegaloModule]
  });
  const documentSuscripcion= SwaggerModule.createDocument(app, documentBuilderSuscripcion, {
    include: [SuscripcionModule]
  });
  const documentUsuario= SwaggerModule.createDocument(app, documentBuilderUsuario, {
    include: [UsuarioModule]
  });
  const documentInvitado= SwaggerModule.createDocument(app, documentBuilderinvitado, {
    include: [InvitadoModule]
  });
  const documentProducto= SwaggerModule.createDocument(app, documentBuilderProducto, {
    include: [ProductoModule]
  });

  SwaggerModule.setup ('documentacion', app, document); 
  SwaggerModule.setup ('Administracion', app, documentAdministracion);
  SwaggerModule.setup ('cajasdelmes', app, documentCajasDelMes);
  SwaggerModule.setup ('cajasmisteriosas', app, documentCajasMisteriosas);
  SwaggerModule.setup ('api-docs/carrodecompras', app, documentCarrodecompras);
  SwaggerModule.setup ('Catalogodeproductos', app, documentCatalogodeproductos);
  SwaggerModule.setup ('comunidad', app, documentComunidad);
  SwaggerModule.setup ('footer', app, documentFooter);
  SwaggerModule.setup ('paginadeinicio', app, documentPaginadeinicio);
  SwaggerModule.setup ('regalo', app, documentRegalo);
  SwaggerModule.setup ('suscripcion', app, documentSuscripcion);
  SwaggerModule.setup ('usuario', app, documentUsuario);
  SwaggerModule.setup ('api-docs/invitados', app, documentInvitado);
  SwaggerModule.setup ('api-docs/producto', app, documentProducto);

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
 