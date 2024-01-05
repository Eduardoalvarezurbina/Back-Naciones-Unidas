import { Controller, Get, Param, Post, Body, Put, Patch, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductoService } from './producto.service';
import { ProductoInputDto } from './dto/producto-input.dto';
import { ProductoEntity } from './producto.entity';
import { AdminGuard } from '../auth/admin.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Producto')
@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @Post()  
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @ApiBody({ type: ProductoInputDto })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente', type: ProductoEntity })
  @ApiResponse({ status: 500, description: 'Error al crear el producto' })
  async crearProducto(@Body() productoDto: ProductoInputDto): Promise<ProductoEntity> {
    
    try {
      const { imagen1, imagen2, imagen3, ...restoProductoDto } = productoDto;
      const imagePath = await this.productoService.guardarImagen(productoDto.nombre, productoDto.imagen1, productoDto.imagen2, productoDto.imagen3);
      const updatedProductoDto = {
        ...restoProductoDto,
        imagen1: imagePath.imagen1,
        imagen2: imagePath.imagen2,
        imagen3: imagePath.imagen3,
      };
      return await this.productoService.crearProducto(updatedProductoDto);
    } catch (error) {
      throw new HttpException('Error al crear el producto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  } 

  @ApiOperation({ summary: 'Obtener un producto por su ID' })
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Producto encontrado exitosamente', type: ProductoEntity })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async obtenerProductoPorId(@Param('id') id: number): Promise<ProductoEntity> {
    try {
      return await this.productoService.obtenerProductoPorId(id);
    } catch (error) {
      throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation({ summary: 'Obtener todos los productos' })
  @Get()
  @ApiResponse({ status: 200, description: 'Productos obtenidos exitosamente', type: [ProductoEntity] })
  @ApiResponse({ status: 500, description: 'Error al obtener los productos' })
  async obtenerTodosLosProductos(): Promise<ProductoEntity[]> {
    try {
      return await this.productoService.obtenerTodosLosProductos();
    } catch (error) {
      throw new HttpException('Error al obtener los productos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @ApiOperation({ summary: 'Actualizar un producto por su ID' })
  @Put(':id')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @ApiBody({ type: ProductoInputDto })
  @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente', type: ProductoEntity })
  @ApiResponse({ status: 500, description: 'Error al actualizar el producto' })
  async actualizarProducto(@Param('id') id: number, @Body() productoDto: ProductoInputDto): Promise<ProductoEntity> {
    try {
      return await this.productoService.actualizarProducto(id, productoDto);
    } catch (error) {
      throw new HttpException('Error al actualizar el producto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Actualizar parcialmente un producto por su ID' })
  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @ApiBody({ type: ProductoInputDto })
  @ApiResponse({ status: 200, description: 'Producto actualizado parcialmente exitosamente', type: ProductoEntity })
  @ApiResponse({ status: 500, description: 'Error al actualizar parcialmente el producto' })
  async actualizarParcialProducto(@Param('id') id: number, @Body() productoDto: Partial<ProductoInputDto>): Promise<ProductoEntity> {
    try {
      return await this.productoService.actualizarParcialProducto(id, productoDto);
    } catch (error) {
      throw new HttpException('Error al actualizar parcialmente el producto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Eliminar un producto por su ID' })
  @Delete(':id')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @ApiResponse({ status: 200, description: 'Producto eliminado exitosamente' })
  @ApiResponse({ status: 500, description: 'Error al eliminar el producto' })
  async eliminarProducto(@Param('id') id: number): Promise<void> {
    try {
      return await this.productoService.eliminarProducto(id);
    } catch (error) {
      throw new HttpException('Error al eliminar el producto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}