// usuario.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';
import { RegistroDto } from './dto/usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async findOneByCorreo(correo: string): Promise<UsuarioEntity> {
    return await this.usuarioRepository.findOne({ where: { correo } });
  }

  async registrarUsuario(registroDto: RegistroDto): Promise<UsuarioEntity> {
    const usuario = new UsuarioEntity();
    usuario.nombre = registroDto.nombre;
    usuario.rut = registroDto.rut;
    usuario.telefono = registroDto.telefono;
    usuario.correo = registroDto.correo;
    usuario.direccion = registroDto.direccion;

    const usuarioExistente = await this.usuarioRepository.findOne({ where: { correo: usuario.correo } });

    if (usuarioExistente) {
        throw new ConflictException('El correo ya está registrado');
    }

    await usuario.setClave(registroDto.password);
    return await this.usuarioRepository.save(usuario);
  }
}