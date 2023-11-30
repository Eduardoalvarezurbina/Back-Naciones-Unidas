import { Controller, Get, Param, Post, Body, Put, Patch, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductoService } from './producto.service';
import { ProductoInputDto } from './dto/producto-input.dto';
import { ProductoEntity } from './producto.entity';
import { writeFileSync } from 'fs';
import { join } from 'path';

@ApiTags('Productos')
@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
async crearProducto(@Body() productoDto: ProductoInputDto): Promise<ProductoEntity> {
  // Decodificar la imagen
const imageBuffer = Buffer.from(productoDto.imagen, 'base64');

// Generar un nombre de archivo único para la imagen
const imageName = `${Date.now()}.png`;

// Escribir la imagen en la carpeta 'imagenes'
writeFileSync(join(__dirname, '..', 'imagenes', imageName), imageBuffer);

// Crear un nuevo DTO que incluya la nueva ruta de la imagen
const updatedProductoDto = {
  ...productoDto,
  imagen: `/imagenes/${imageName}`,
};

// Crear el producto
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
  async actualizarProducto(@Param('id') id: number, @Body() productoDto: ProductoInputDto): Promise<ProductoEntity> {
    return await this.productoService.actualizarProducto(id, productoDto);
  }

  @Patch(':id')
  async actualizarParcialProducto(@Param('id') id: number, @Body() productoDto: Partial<ProductoInputDto>): Promise<ProductoEntity> {
    return await this.productoService.actualizarParcialProducto(id, productoDto);
  }

  @Delete(':id')
  async eliminarProducto(@Param('id') id: number): Promise<void> {
    return await this.productoService.eliminarProducto(id);
  }
}
