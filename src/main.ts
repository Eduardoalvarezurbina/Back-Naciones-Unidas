import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CarroDeComprasModule } from './module/carro-de-compras.module';
import { LoginModule } from './module/login.module';
import { UsuarioModule } from './module/usuario.module';
import { SuscripcionModule } from './module/suscripcion.module';
import { InvitadoModule } from './module/invitado.module'; 
import { ProductoModule } from './module/producto.module';
import { CompraModule } from './module/compra.module';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { CajaModule } from './module/caja.module';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { ComentarioModule } from './module/comentario.module';

async function bootstrap() {
  const server =express();
  //const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(server));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
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

let documentBuilderCaja =new DocumentBuilder()
  .setTitle("Documentación de la API - Cajas ")
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

let documentBuilderAuth =new DocumentBuilder()
  .setTitle("Documentación de la API - Autenticación")
  .setVersion(versionProyecto)
  .setDescription("Página web Naciones Unidas")
  .setContact("Eduardo Alvarez", "http://google.com", "Eduardoalvarezurbina94@gmail.com")
  .build();


let documentBuilderUsuario =new DocumentBuilder()
  .setTitle("Documentación de la API - Usuario y registo de usuario")
  .setVersion(versionProyecto)
  .setDescription("Página web Naciones Unidas")
  .setContact("Eduardo Alvarez", "http://google.com", "Eduardoalvarezurbina94@gmail.com")
  .build();

let documentBuilderCompra =new DocumentBuilder()
  .setTitle("Documentación de la API - Compra")
  .setVersion(versionProyecto)
  .setDescription("Página web Naciones Unidas")
  .setContact("Eduardo Alvarez", "http://google.com", "Eduardoalvarezurbina94@gmail.com")
  .build();
let documentBuilderLogin =new DocumentBuilder()
  .setTitle("Documentación de la API - Login")
  .setVersion(versionProyecto)
  .setDescription("Página web Naciones Unidas")
  .setContact("Eduardo Alvarez", "http://google.com", "Eduardoalvarezurbina94@gmail.com")
  .build();
  
let documentBuilderComentario =new DocumentBuilder()
  .setTitle("Documentación de la API - Comentario")
  .setVersion(versionProyecto)
  .setDescription("Página web Naciones Unidas")
  .setContact("Eduardo Alvarez", "http://google.com", "Eduardoalvarezurbina94@gmail")
  .build();
  const document = SwaggerModule.createDocument(app, documentBuilder);
 
  const documentCajasDelMes= SwaggerModule.createDocument(app, documentBuilderCaja, {
    include: [CajaModule]
  });

  const documentCarrodecompras= SwaggerModule.createDocument(app, documentBuilderCarrodecompras, {
    include: [CarroDeComprasModule]
  });

  const documentFooter= SwaggerModule.createDocument(app, documentBuilderAuth, {
    include: [LoginModule]
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
  const documentCompra= SwaggerModule.createDocument(app, documentBuilderCompra, {
    include: [CompraModule]
  });
  const documentLogin= SwaggerModule.createDocument(app, documentBuilderLogin, {
    include: [LoginModule]
  });
  const documentComentario= SwaggerModule.createDocument(app, documentBuilderComentario, {
    include: [ComentarioModule]
  });

  SwaggerModule.setup ('documentacion', app, document); 
  SwaggerModule.setup ('api-docs/caja', app, documentCajasDelMes);
  SwaggerModule.setup ('api-docs/carrodecompras', app, documentCarrodecompras);
  SwaggerModule.setup ('api-docs/login', app, documentFooter);
  SwaggerModule.setup ('api-docs/suscripcion', app, documentSuscripcion);
  SwaggerModule.setup ('api-docs/usuario', app, documentUsuario);
  SwaggerModule.setup ('api-docs/invitado', app, documentInvitado);
  SwaggerModule.setup ('api-docs/producto', app, documentProducto);
  SwaggerModule.setup ('api-docs/compra', app, documentCompra);
  SwaggerModule.setup ('api-docs/login', app, documentLogin)
  SwaggerModule.setup ('api-docs/comentario',app, documentComentario)


  app.useStaticAssets('C:\\Users\\edoal\\Desktop\\Backend\\imagenes',{
    prefix: '/imagenes/', // Prefijo de la ruta para acceder a los archivos
  });


  await app.listen(3000, '0.0.0.0');
}
bootstrap();
 