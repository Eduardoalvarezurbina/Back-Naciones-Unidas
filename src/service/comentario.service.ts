import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { ComentarioEntity } from 'src/entity/comentario.entity';
import { ComentarioDTO } from 'src/dto/comentario.dto';
import { ProductoEntity } from 'src/entity/producto.entity';
import { UsuarioEntity } from 'src/entity/usuario.entity';

@Injectable()
export class ComentarioService {
  private readonly logger = new Logger(ComentarioService.name);

  constructor(
    @InjectRepository(ComentarioEntity)
    private readonly comentarioRepository: Repository<ComentarioEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(ProductoEntity)
    private readonly productoRepository: Repository<ProductoEntity>,
  ) {}
  
  async getComentariosPorProducto(idProducto: number): Promise<ComentarioEntity[]> {
    return this.comentarioRepository.find({ where: { producto: { id: idProducto } } });
  }
  async crearComentario(dto: ComentarioDTO): Promise<ComentarioEntity> {
    this.logger.debug('Buscando usuario y producto');
    const usuario = await this.usuarioRepository.findOne({ where: { id: dto.usuario } });
    const producto = await this.productoRepository.findOne({ where: { id: dto.producto } });

    if (!usuario) {
      this.logger.error(`Usuario con ID ${dto.usuario} no encontrado`);
      throw new NotFoundException(`Usuario con ID ${dto.usuario} no encontrado`);
    }

    if (!producto) {
      this.logger.error(`Producto con ID ${dto.producto} no encontrado`);
      throw new NotFoundException(`Producto con ID ${dto.producto} no encontrado`);
    }

    this.logger.debug('Creando comentario');
    const comentario = this.comentarioRepository.create({
      comentario: dto.comentario,
      usuario,
      producto,
    });

    this.logger.debug('Guardando comentario');
    return this.comentarioRepository.save(comentario);
  }
}
  

