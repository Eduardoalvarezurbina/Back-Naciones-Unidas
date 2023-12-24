import { Controller, Get, Param, Post, Body, Put, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductoService } from './producto.service';
import { ProductoInputDto } from './dto/producto-input.dto';
import { ProductoEntity } from './producto.entity';
import { AdminGuard } from '../auth/admin.guard';
import { AutenticacionGuard } from 'src/auth/auth.guard';

@ApiTags('Productos')
@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  @UseGuards(AutenticacionGuard)
  @UseGuards(AdminGuard)
  async crearProducto(@Body() productoDto: ProductoInputDto): Promise<ProductoEntity> {
    
    const imageName = productoDto.nombre;
  
    
    const imagePath = await this.productoService.guardarImagen(imageName, productoDto.imagen);
  
    
    const updatedProductoDto = {
      ...productoDto,
      imagen: imagePath,
    };
  
    
    return await this.productoService.crearProducto(updatedProductoDto);
  }

  @Get(':id')
  async obtenerProductoPorId(@Param('id') id: number): Promise<ProductoEntity> {
    return await this.productoService.obtenerProductoPorId(id);
  }

  @Get()
  async obtenerTodosLosProductos(): Promise<ProductoEntity[]> {
    return await this.productoService.obtenerTodosLosProductos();
  }

  @Put(':id')
  @UseGuards(AutenticacionGuard)
  @UseGuards(AdminGuard)
  async actualizarProducto(@Param('id') id: number, @Body() productoDto: ProductoInputDto): Promise<ProductoEntity> {
    return await this.productoService.actualizarProducto(id, productoDto);
  }

  @Patch(':id')
  @UseGuards(AutenticacionGuard)
  @UseGuards(AdminGuard)
  async actualizarParcialProducto(@Param('id') id: number, @Body() productoDto: Partial<ProductoInputDto>): Promise<ProductoEntity> {
    return await this.productoService.actualizarParcialProducto(id, productoDto);
  }

  @Delete(':id')
  @UseGuards(AutenticacionGuard)
  @UseGuards(AdminGuard)
  async eliminarProducto(@Param('id') id: number): Promise<void> {
    return await this.productoService.eliminarProducto(id);
  }
}
