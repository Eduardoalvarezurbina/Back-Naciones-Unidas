import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductoService } from './producto.service';
import { ProductoInputDto } from './dto/producto-input.dto';
import { ProductoEntity } from './producto.entity';

@ApiTags('Productos')
@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  async crearProducto(@Body() productoDto: ProductoInputDto): Promise<ProductoEntity> {
    return await this.productoService.crearProducto(productoDto);
  }

  @Get(':id')
  async obtenerProductoPorId(@Param('id') id: number): Promise<ProductoEntity> {
    return await this.productoService.obtenerProductoPorId(id);
  }

  @Get()
  async obtenerTodosLosProductos(): Promise<ProductoEntity[]> {
    return await this.productoService.obtenerTodosLosProductos();
  }
}
