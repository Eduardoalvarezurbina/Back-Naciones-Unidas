import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CajaEntity } from '../entity/caja.entity';
import { CajaDto } from '../dto/caja.dto';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class CajaService {
  private readonly logger = new Logger(CajaService.name);
  constructor(
    @InjectRepository(CajaEntity) // Inyectar Dependencias del repositorio
    private readonly cajaRepository: Repository<CajaEntity>,
  ) {}

  async crearCaja(cajaDto: CajaDto): Promise<CajaEntity> { // Crear una nueva caja
    this.logger.debug('Creando caja');
    try {
      const caja = this.cajaRepository.create(cajaDto); // Crear una nueva caja
      return await this.cajaRepository.save(caja); // Guardar caja en la base de datos
    } catch (error) {
      this.logger.error('Error al crear caja');
      throw new InternalServerErrorException('Error al crear la caja');
    }
  }

  async obtenerCajaPorId(id: number): Promise<CajaEntity> { // Obtener una caja por su ID
    this.logger.debug('Obteniendo caja por ID');
    try {
      const caja = await this.cajaRepository.findOne({ where: { id } }); // Buscar caja por ID
      if (!caja) {
        this.logger.warn('Caja no encontrada');
        throw new NotFoundException('Caja no encontrada');
      }
      return caja;
    } catch (error) {
      this.logger.error('Error al obtener caja por ID');
      throw new InternalServerErrorException('Error al obtener la caja');
    }
  }

  async obtenerTodasLasCajas(): Promise<CajaEntity[]> { // Obtener todas las cajas
    this.logger.debug('Obteniendo todas las cajas');
    try {
      return await this.cajaRepository.find(); // Buscar todas las cajas
    } catch (error) {
      this.logger.error('Error al obtener todas las cajas');
      throw new InternalServerErrorException('Error al obtener las cajas');
    }
  }

  async actualizarCaja(id: number, cajaDto: CajaDto): Promise<CajaEntity> { // Actualizar una caja
    this.logger.debug('Actualizando caja');
    try {
      const cajaExistente = await this.obtenerCajaPorId(id); // Buscar caja por ID
      if (!cajaExistente) {
        this.logger.warn('Caja no encontrada');
        throw new NotFoundException('Caja no encontrada');
      }
      Object.assign(cajaExistente, cajaDto); // Actualizar caja
      return await this.cajaRepository.save(cajaExistente);
    } catch (error) {
      this.logger.error('Error al actualizar caja');
      throw new InternalServerErrorException('Error al actualizar la caja');
    }
  }

  async actualizarParcialCaja(id: number, cajaDto: Partial<CajaDto>): Promise<CajaEntity> { // Actualizar parcialmente una caja
    this.logger.debug('Actualizando parcialmente caja');
    try {
      const cajaExistente = await this.obtenerCajaPorId(id);
      if (!cajaExistente) {
        this.logger.warn('Caja no encontrada');
        throw new NotFoundException('Caja no encontrada');
      }
      Object.assign(cajaExistente, cajaDto); // Actualizar parcialmente caja
      return await this.cajaRepository.save(cajaExistente);
    } catch (error) {
      this.logger.error('Error al actualizar parcialmente caja');
      throw new InternalServerErrorException('Error al actualizar parcialmente la caja');
    }
  }

  async guardarImagen( // Guardar imagen
    nombre: string,
    imagenBase64: string,
    imagenBase64_2?: string,
    imagenBase64_3?: string,
  ): Promise<{ imagen1: string; imagen2?: string; imagen3?: string }> { // Guardar imagen
    //console.log(`guardarImagen llamado con nombre: ${nombre}`);
    //console.log('imagenBase64: ', imagenBase64);
  
    const imagenbuena = imagenBase64.split(';base64,').pop(); // Obtener imagen de la cadena base64
    const imagenBuffer = Buffer.from(imagenbuena, 'base64'); // Convertir imagen a buffer
  
    const directorioImagenes = 'C:\\Users\\edoal\\Desktop\\Backend\\imagenes';
    await mkdir(directorioImagenes, { recursive: true }); // Crear directorio de imagenes
  
    const rutaImagen = join(directorioImagenes, `${nombre}.png`); // Guardar imagen en el directorio
    await writeFile(rutaImagen, imagenBuffer); // Guardar imagen en el directorio
  
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
  
  async eliminarCaja(id: number): Promise<void> { // Eliminar una caja
    this.logger.debug('Eliminando caja');
    try {
      const cajaExistente = await this.obtenerCajaPorId(id);
      if (!cajaExistente) {
        this.logger.warn('Caja no encontrada');
        throw new NotFoundException('Caja no encontrada');
      }
      await this.cajaRepository.remove(cajaExistente);
    } catch (error) {
      this.logger.error('Error al eliminar caja');
      throw new InternalServerErrorException('Error al eliminar la caja');
    }
  }
}