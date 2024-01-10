import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductoEntity } from '../entity/producto.entity';
import { ProductoInputDto } from '../dto/producto-input.dto';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class ProductoService {  // Crear una nueva caja
  private readonly logger= new Logger(ProductoService.name);
  constructor(
    @InjectRepository(ProductoEntity)
    private readonly productoRepository: Repository<ProductoEntity>, // Inyectar Dependencias del repositorio
  ) {}

  async crearProducto(productoDto: ProductoInputDto): Promise<ProductoEntity> {
    this.logger.debug('Creando producto');
    try {
      const producto = this.productoRepository.create(productoDto); // Crear un nuevo producto
      return await this.productoRepository.save(producto); // Guardar el producto
    } catch (error) {
      this.logger.error('Error al crear producto');
      throw new InternalServerErrorException('Error al crear el producto');
    }
  }

  async obtenerProductoPorId(id: number): Promise<ProductoEntity> { // Obtener un producto su ID
    this.logger.debug('Obteniendo producto por ID');
    try {
      const producto = await this.productoRepository.findOne({ where: { id } }); // Buscar producto por ID
      if (!producto) { // Si no existe la caja
        this.logger.warn('Producto no encontrado');
        throw new NotFoundException('Producto no encontrado'); 
      }
      this.logger.debug('Producto encontrado');
      producto.imagen = `${producto.imagen}`; // Convertir la imagen a string
      return producto; // retorna el producto
    } catch (error) {
      this.logger.error('Error al obtener producto por ID');
      throw new InternalServerErrorException('Error al obtener el producto');
    }
  }

  async obtenerTodosLosProductos(): Promise<ProductoEntity[]> { // obtiene todos los productos
    this.logger.debug('Obteniendo todos los productos');
  try {
    const productos = await this.productoRepository.find(); // busca todos los productos
    productos.forEach((producto) => { 
      producto.imagen = `${producto.imagen}`; // Convertir la imagen a string
    });
    return productos; // retorna los productos
  } catch (error) {
    this.logger.error('Error al obtener todos los productos');
    throw new InternalServerErrorException('Error al obtener los productos');
  }
}

  async actualizarProducto(id: number, productoDto: ProductoInputDto): Promise<ProductoEntity> {
  this.logger.debug('Actualizando producto');  
  try {
    const productoExistente = await this.obtenerProductoPorId(id);
    if (!productoExistente) {
      this.logger.warn('Producto no encontrado');
      throw new NotFoundException('Producto no encontrado');
    }
    Object.assign(productoExistente, productoDto); // Actualiza el producto
    return await this.productoRepository.save(productoExistente); 
  } catch (error) {
    this.logger.error('Error al actualizar producto');
    throw new InternalServerErrorException('Error al actualizar el producto');
  }
}

async actualizarParcialProducto(id: number, productoDto: Partial<ProductoInputDto>): Promise<ProductoEntity> {
  this.logger.debug('Actualizando parcialmente producto');
  try {
    const productoExistente = await this.obtenerProductoPorId(id); // Buscar producto por ID
    if (!productoExistente) {
      this.logger.warn('Producto no encontrado');
      throw new NotFoundException('Producto no encontrado');
    }
    Object.assign(productoExistente, productoDto);  // Actualizar parcialmente el producto
    return await this.productoRepository.save(productoExistente); // Actualizar el producto
  } catch (error) {
    this.logger.error('Error al actualizar parcialmente producto');
    throw new InternalServerErrorException('Error al actualizar parcialmente el producto');
  }
}

  async guardarImagen( // Guardar imagen
    nombre: string,
    imagenBase64: string,
    imagenBase64_2?: string,
    imagenBase64_3?: string,
  ): Promise<{ imagen1: string; imagen2?: string; imagen3?: string }> {
    console.log(`guardarImagen llamado con nombre: ${nombre}`);
    console.log('imagenBase64: ', imagenBase64);

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
      imagen2,
      imagen3,
    };
  }

  async eliminarProducto(id: number): Promise<void> { // Eliminar un producto por el id
    this.logger.debug('Eliminando producto');
    try {
      const productoExistente = await this.obtenerProductoPorId(id);
      if (!productoExistente) {
        this.logger.warn('Producto no encontrado');
        throw new NotFoundException('Producto no encontrado');
      }
      await this.productoRepository.remove(productoExistente);
    } catch (error) {
      this.logger.error('Error al eliminar producto');
      throw new InternalServerErrorException('Error al eliminar el producto');
    }
  }
}