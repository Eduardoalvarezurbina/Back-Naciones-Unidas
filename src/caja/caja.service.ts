import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CajaEntity } from './caja.entity';
import { CajaDto } from './dto/caja.dto';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class CajaService {
  constructor(
    @InjectRepository(CajaEntity)
    private readonly cajaRepository: Repository<CajaEntity>,
  ) {}

  async crearCaja(cajaDto: CajaDto): Promise<CajaEntity> {
    try {
      const caja = this.cajaRepository.create(cajaDto);
      return await this.cajaRepository.save(caja);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear la caja');
    }
  }

  async obtenerCajaPorId(id: number): Promise<CajaEntity> {
    try {
      const caja = await this.cajaRepository.findOne({ where: { id } });
      if (!caja) {
        throw new NotFoundException('Caja no encontrada');
      }
      return caja;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener la caja');
    }
  }

  async obtenerTodasLasCajas(): Promise<CajaEntity[]> {
    try {
      return await this.cajaRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener las cajas');
    }
  }

  async actualizarCaja(id: number, cajaDto: CajaDto): Promise<CajaEntity> {
    try {
      const cajaExistente = await this.obtenerCajaPorId(id);
      if (!cajaExistente) {
        throw new NotFoundException('Caja no encontrada');
      }
      Object.assign(cajaExistente, cajaDto);
      return await this.cajaRepository.save(cajaExistente);
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar la caja');
    }
  }

  async actualizarParcialCaja(id: number, cajaDto: Partial<CajaDto>): Promise<CajaEntity> {
    try {
      const cajaExistente = await this.obtenerCajaPorId(id);
      if (!cajaExistente) {
        throw new NotFoundException('Caja no encontrada');
      }
      Object.assign(cajaExistente, cajaDto);
      return await this.cajaRepository.save(cajaExistente);
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar parcialmente la caja');
    }
  }

  async guardarImagen(
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
  
  async eliminarCaja(id: number): Promise<void> {
    try {
      const cajaExistente = await this.obtenerCajaPorId(id);
      if (!cajaExistente) {
        throw new NotFoundException('Caja no encontrada');
      }
      await this.cajaRepository.remove(cajaExistente);
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar la caja');
    }
  }
}