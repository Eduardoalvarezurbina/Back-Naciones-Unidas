import { Controller, Get, Param, Post, Body, Put, Patch, Delete, UseGuards, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductoService } from '../service/producto.service';
import { ProductoInputDto } from '../dto/producto-input.dto';
import { ProductoEntity } from '../entity/producto.entity';
import { RolesGuard } from 'src/autenticacion/roles.guard';
import { Roles } from 'src/autenticacion/roles.decorador';
import { Permisos } from 'src/autenticacion/permisos.decorador';
import { PermisosGuard } from 'src/autenticacion/permisos.guard';
import { AuthGuard } from 'src/autenticacion/auth.guard';



@ApiTags('Producto')
@Controller('producto')
export class ProductoController {
  private readonly logger = new Logger(ProductoController.name); // Para mostrar mensajes en la consola
  constructor(private readonly productoService: ProductoService) {} // Inyectar dependencias

  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiBody({ type: ProductoInputDto, description: 'Ingrese los datos para crear un nuevo producto' })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente', type: ProductoEntity })
  @ApiResponse({ status: 500, description: 'Error al crear el producto' })
  @Post()
  @Roles('administrador')
  @Permisos('crear-producto')
  @UseGuards(PermisosGuard)   
  async crearProducto(@Body() productoDto: ProductoInputDto): Promise<ProductoEntity> {// metodo para crear un producto
    this.logger.log('Crear producto');
    try {
      const { imagen1, imagen2, imagen3, ...restoProductoDto } = productoDto; // Desestructurar el objeto productoDto
      const imagePath = await this.productoService.guardarImagen(productoDto.nombreProducto, productoDto.imagen1, productoDto.imagen2, productoDto.imagen3);//guardar imagen
      const updatedProductoDto = {
        ...restoProductoDto,
        imagen1: imagePath.imagen1,
        imagen2: imagePath.imagen2,
        imagen3: imagePath.imagen3,
      };
      return await this.productoService.crearProducto(updatedProductoDto); // Llamar al servicio para crear un producto
    } catch (error) {
      this.logger.error(error.stack);
      throw new HttpException('Error al crear el producto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  } 

  @ApiOperation({ summary: 'Obtener un producto por su ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID del producto' })
  @ApiResponse({ status: 200, description: 'Producto encontrado exitosamente', type: ProductoEntity })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @Get(':id')
    async obtenerProductoPorId(@Param('id') id: number): Promise<ProductoEntity> {//metodo para obtener un producto por id
      this.logger.log('Obtener producto por ID${id}');
    try {
      return await this.productoService.obtenerProductoPorId(id);//llamar al servicio para obtener un producto por id
    } catch (error) {
      throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({ status: 200, description: 'Productos obtenidos exitosamente', type: [ProductoEntity] })
  @ApiResponse({ status: 500, description: 'Error al obtener los productos' })  
  @Get()
    async obtenerTodosLosProductos(): Promise<ProductoEntity[]> {//metodo para obtener todos los productos
      this.logger.log('Obtener todos los productos');
    try {
      return await this.productoService.obtenerTodosLosProductos();
    } catch (error) {
      this.logger.error(error.stack);
      throw new HttpException('Error al obtener los productos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Actualizar un producto por su ID' })
  @ApiBody({ type: ProductoInputDto, description: 'Ingrese los datos para actualizar un producto' })
  @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente', type: ProductoEntity })
  @ApiResponse({ status: 500, description: 'Error al actualizar el producto' })
  @Put(':id')
  @Roles('administrador')
  @Permisos('actualizar-producto')
  @UseGuards(PermisosGuard)
  async actualizarProducto(@Param('id') id: number, @Body() productoDto: ProductoInputDto): Promise<ProductoEntity> { //metodo para actualizar un producto
    this.logger.log('Actualizar producto');
    try {
      return await this.productoService.actualizarProducto(id, productoDto);//llamar al servicio para actualizar un producto
    } catch (error) {
      this.logger.error(error.stack);
      throw new HttpException('Error al actualizar el producto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Actualizar parcialmente un producto por su ID' })
  @ApiBody({ type: ProductoInputDto, description: 'Ingrese los datos para actualizar parcialmente un producto' })
  @ApiResponse({ status: 200, description: 'Producto actualizado parcialmente exitosamente', type: ProductoEntity })
  @ApiResponse({ status: 500, description: 'Error al actualizar parcialmente el producto' })
  @Patch(':id')
  @Roles('administrador')
  @Permisos('actualizar-producto-parcialmente')
  @UseGuards(PermisosGuard)
  async actualizarParcialProducto(@Param('id') id: number, @Body() productoDto: Partial<ProductoInputDto>): Promise<ProductoEntity> { // metodo para actualizar parcialmente un producto
    this.logger.log('Actualizar parcialmente producto');
    try {
      return await this.productoService.actualizarParcialProducto(id, productoDto); // Llamar al servicio para actualizar parcialmente un producto
    } catch (error) {
      this.logger.error(error.stack);
      throw new HttpException('Error al actualizar parcialmente el producto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Eliminar un producto por su ID' })
  @ApiResponse({ status: 200, description: 'Producto eliminado exitosamente' })
  @ApiResponse({ status: 500, description: 'Error al eliminar el producto' })
  @Delete(':id')
  @Roles('administrador')
  @Permisos('eliminar-producto')
  @UseGuards(PermisosGuard)
  @ApiResponse({ status: 200, description: 'Producto eliminado exitosamente' })
  @ApiResponse({ status: 500, description: 'Error al eliminar el producto' })
  async eliminarProducto(@Param('id') id: number): Promise<void> { // metodo para eliminar un producto
    this.logger.log('Eliminar producto');
    try {
      return await this.productoService.eliminarProducto(id);
    } catch (error) {
      this.logger.error(error.stack);
      throw new HttpException('Error al eliminar el producto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}