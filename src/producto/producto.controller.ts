import { Controller, Get, Param, Post, Body, Put, Patch, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductoService } from './producto.service';
import { ProductoInputDto } from './dto/producto-input.dto';
import { ProductoEntity } from './producto.entity';
import { AdminGuard } from '../auth/admin.guard';
import { AutenticacionGuard } from 'src/auth/auth.guard';

@ApiTags('Producto')
@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  @UseGuards(AutenticacionGuard)
  @UseGuards(AdminGuard)
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

  @Get(':id')
  async obtenerProductoPorId(@Param('id') id: number): Promise<ProductoEntity> {
    try {
      return await this.productoService.obtenerProductoPorId(id);
    } catch (error) {
      throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async obtenerTodosLosProductos(): Promise<ProductoEntity[]> {
    try {
      return await this.productoService.obtenerTodosLosProductos();
    } catch (error) {
      throw new HttpException('Error al obtener los productos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @UseGuards(AutenticacionGuard)
  @UseGuards(AdminGuard)
  async actualizarProducto(@Param('id') id: number, @Body() productoDto: ProductoInputDto): Promise<ProductoEntity> {
    try {
      return await this.productoService.actualizarProducto(id, productoDto);
    } catch (error) {
      throw new HttpException('Error al actualizar el producto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @UseGuards(AutenticacionGuard)
  @UseGuards(AdminGuard)
  async actualizarParcialProducto(@Param('id') id: number, @Body() productoDto: Partial<ProductoInputDto>): Promise<ProductoEntity> {
    try {
      return await this.productoService.actualizarParcialProducto(id, productoDto);
    } catch (error) {
      throw new HttpException('Error al actualizar parcialmente el producto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @UseGuards(AutenticacionGuard)
  @UseGuards(AdminGuard)
  async eliminarProducto(@Param('id') id: number): Promise<void> {
    try {
      return await this.productoService.eliminarProducto(id);
    } catch (error) {
      throw new HttpException('Error al eliminar el producto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}