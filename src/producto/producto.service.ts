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
  eliminarProducto(id: number): void | PromiseLike<void> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(ProductoEntity)
    private readonly productoRepository: Repository<ProductoEntity>,
  ) {}

  async crearProducto(productoDto: ProductoInputDto): Promise<ProductoEntity> {
    const producto = this.productoRepository.create(productoDto);
    return await this.productoRepository.save(producto);
  }

  async obtenerProductoPorId(id: number): Promise<ProductoEntity> {
    const producto = await this.productoRepository.findOne({ where: { id } });

    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    producto.imagen = `${producto.imagen}`;


    return producto;
  }

  async obtenerTodosLosProductos(): Promise<ProductoEntity[]> {
    const productos = await this.productoRepository.find();

    productos.forEach(producto => {
    producto.imagen = `${producto.imagen}`;
  });

  return productos;
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

  async guardarImagen(nombre: string, imagenBase64: string, imagenBase64_2?: string, imagenBase64_3?: string): Promise<{ imagen1: string, imagen2?: string, imagen3?: string }> {
    console.log(`guardarImagen llamado con nombre: ${nombre}`);
    console.log("imagenBase64: ", imagenBase64);
    const imagenbuena = imagenBase64.split(';base64,').pop();
    const imagenBuffer = Buffer.from(imagenbuena, 'base64');
    const directorioImagenes = 'C:\\Users\\edoal\\Desktop\\Backend\\imagenes';
    await mkdir(directorioImagenes, { recursive: true });
    const rutaImagen = join(directorioImagenes, `${nombre}.png`);
    await writeFile(rutaImagen, imagenBuffer);
  
    let imagen2: string | undefined;
    if (imagenBase64_2) {
      const imagenbuena2 = imagenBase64_2.split(';base64,').pop();
      const imagenBuffer2 = Buffer.from(imagenbuena2, 'base64');
      const rutaImagen2 = join(directorioImagenes, `${nombre}_2.png`);
      await writeFile(rutaImagen2, imagenBuffer2);
      imagen2 = `/imagenes/${nombre}_2.png`;
    }
    
    let imagen3: string | undefined;
    if (imagenBase64_3) {
      const imagenbuena3 = imagenBase64_3.split(';base64,').pop();
      const imagenBuffer3 = Buffer.from(imagenbuena3, 'base64');
      const rutaImagen3 = join(directorioImagenes, `${nombre}_3.png`);
      await writeFile(rutaImagen3, imagenBuffer3);
      imagen3 = `/imagenes/${nombre}_3.png`;
    }
  
    return {
      imagen1: `/imagenes/${nombre}.png`,
      imagen2: `/imagenes/${nombre}_2.png`,
      imagen3: `/imagenes/${nombre}_3.png`,
    };
  }
  }

