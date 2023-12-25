import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CarroDeComprasModule } from './carro-de-compras/carro-de-compras.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { CajasDelMesModule } from './cajas-del-mes/cajas-del-mes.module';
import { SuscripcionModule } from './suscripcion/suscripcion.module';
import { InvitadoModule } from './invitado/invitado.module'; 
import { ProductoModule } from './producto/producto.module';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import * as bodyParser from 'body-parser';

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

let documentBuilderCajasDelMes =new DocumentBuilder()
  .setTitle("Documentación de la API - Cajas del mes")
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



  const document = SwaggerModule.createDocument(app, documentBuilder);
 
  const documentCajasDelMes= SwaggerModule.createDocument(app, documentBuilderCajasDelMes, {
    include: [CajasDelMesModule]
  });

  const documentCarrodecompras= SwaggerModule.createDocument(app, documentBuilderCarrodecompras, {
    include: [CarroDeComprasModule]
  });

  const documentFooter= SwaggerModule.createDocument(app, documentBuilderAuth, {
    include: [AuthModule]
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
  SwaggerModule.setup ('cajasdelmes', app, documentCajasDelMes);
  SwaggerModule.setup ('api-docs/carrodecompras', app, documentCarrodecompras);
  SwaggerModule.setup ('auth', app, documentFooter);
  SwaggerModule.setup ('suscripcion', app, documentSuscripcion);
  SwaggerModule.setup ('usuario', app, documentUsuario);
  SwaggerModule.setup ('api-docs/invitados', app, documentInvitado);
  SwaggerModule.setup ('api-docs/producto', app, documentProducto);

  //server.use('/imagenes', express.static(join(__dirname, '..', 'imagenes')));

  app.useStaticAssets('C:\\Users\\edoal\\Desktop\\Backend\\imagenes',{
    prefix: '/imagenes/', // Prefijo de la ruta para acceder a los archivos
  });


  await app.listen(3000, '0.0.0.0');
}
bootstrap();
 