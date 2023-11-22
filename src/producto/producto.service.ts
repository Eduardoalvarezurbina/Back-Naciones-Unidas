import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductoEntity } from './producto.entity';
import { ProductoInputDto } from './dto/producto-input.dto';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(ProductoEntity)
    private readonly productoRepository: Repository<ProductoEntity>,
  ) {}

  async crearProducto(productoDto: ProductoInputDto): Promise<ProductoEntity> {
    const rutaImagen = await this.guardarImagen(productoDto.nombre, productoDto.imagen);
    const producto = this.productoRepository.create(productoDto);
    producto.imagen = rutaImagen;
    return await this.productoRepository.save(producto);
  }

  async obtenerProductoPorId(id: number): Promise<ProductoEntity> {
    const producto = await this.productoRepository.findOne({ where: { id } });

    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    return producto;
  }

  async obtenerTodosLosProductos(): Promise<ProductoEntity[]> {
    return await this.productoRepository.find();
  }

  async actualizarProducto(id: number, productoDto: ProductoInputDto): Promise<ProductoEntity> {
    const productoExistente = await this.obtenerProductoPorId(id);

    // Actualiza las propiedades del producto existente con los nuevos valores
    Object.assign(productoExistente, productoDto);

    return await this.productoRepository.save(productoExistente);
  }

  async actualizarParcialProducto(id: number, productoDto: Partial<ProductoInputDto>): Promise<ProductoEntity> {
    const productoExistente = await this.obtenerProductoPorId(id);

    // Actualiza parcialmente las propiedades del producto existente con los nuevos valores
    Object.assign(productoExistente, productoDto);

    return await this.productoRepository.save(productoExistente);
  }

  async eliminarProducto(id: number): Promise<void> {
    const productoExistente = await this.obtenerProductoPorId(id);

    await this.productoRepository.remove(productoExistente);
  }

  async guardarImagen(nombre: string, imagenBase64: string): Promise<string> {
    const imagenBuffer = Buffer.from(imagenBase64, 'base64');
    const directorioImagenes = join(__dirname, '..', 'imagenes');
    await mkdir(directorioImagenes, { recursive: true });
    const rutaImagen = join(directorioImagenes, `${nombre}.png`);
    await writeFile(rutaImagen, imagenBuffer);
    return rutaImagen;
  }
}
