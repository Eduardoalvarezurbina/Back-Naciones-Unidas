import { Injectable, ConflictException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from '../entity/usuario.entity';
import { UsuarioDto } from '../dto/usuario.dto';


@Injectable()
export class UsuarioService {
  private readonly logger = new Logger(UsuarioService.name);
  //obtenerUsuarioPorId(userId: any) {
  //    throw new Error('Method not implemented.');
  //}
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async findOneByCorreo(correo: string): Promise<UsuarioEntity> {
    this.logger.debug(`Buscando usuario por correo: ${correo}`);
    try {
      return await this.usuarioRepository.findOne({ where: { correo } });
    } catch (error) {
      this.logger.error(`Error al buscar usuario por correo: ${correo}`, error.stack);
      throw error;
    }
  }


  async registrarUsuario(usuarioDto: UsuarioDto): Promise<UsuarioEntity> {
    this.logger.debug('Registrando usuario');
    const usuario = new UsuarioEntity();
    usuario.nombreCompleto = usuarioDto.nombreCompleto;
    usuario.rut = usuarioDto.rut; 
    usuario.celular = usuarioDto.celular;
    usuario.region = usuarioDto.region;
    usuario.comuna = usuarioDto.comuna;
    usuario.correo = usuarioDto.correo;
    usuario.direccion = usuarioDto.direccion;
    usuario.referencias = usuarioDto.referencias;

    try {
      const usuarioExistente = await this.usuarioRepository.findOne({ where: { correo: usuario.correo } });

      if (usuarioExistente) {
        this.logger.warn(`El correo ya está registrado: ${usuario.correo}`);
        throw new ConflictException('El correo ya está registrado');
      }

      usuario.setClave(usuarioDto.password);
      const usuarioGuardado = await this.usuarioRepository.save(usuario);
      this.logger.log('Usuario registrado exitosamente');
      return usuarioGuardado;
    } catch (error) {
      this.logger.error('Error al registrar el usuario', error.stack);
      throw error;
    }
  }
}    