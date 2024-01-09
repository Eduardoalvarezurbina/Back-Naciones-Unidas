import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { ComentarioEntity } from 'src/entity/comentario.entity';
import { ComentarioDTO } from 'src/dto/comentario.dto';

@Injectable()
export class ComentarioService {
  private readonly logger = new Logger(ComentarioService.name);

  constructor(
    @InjectRepository(ComentarioEntity)
    private comentarioRepository: Repository<ComentarioEntity>,
  ) {}

  async crearComentario(dto: ComentarioDTO): Promise<ComentarioEntity> {
    this.logger.log('Creando un nuevo comentario');
    const comentario = this.comentarioRepository.create(dto);
    return this.comentarioRepository.save(comentario);
  }
}