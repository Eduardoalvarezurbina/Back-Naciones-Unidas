import { Body, Controller, Get, Post, Logger } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsuarioService } from '../service/usuario.service';
import { UsuarioDto } from '../dto/usuario.dto';

@ApiTags('Usuario')
@Controller('usuario')
export class UsuarioController {
  private readonly logger = new Logger(UsuarioController.name);

    constructor(private readonly usuarioService: UsuarioService) {}

    @ApiBody({ type: UsuarioDto })
    @ApiResponse({ status: 201, description: 'Usuario registrado correctamente'})
    @ApiOperation({ summary: 'Registrar un nuevo usuario' })
    @Post()
    async registrarUsuario(@Body() registroDto: UsuarioDto) {
      this.logger.debug('Registrando un nuevo usuario');
      try {
        const usuario = await this.usuarioService.registrarUsuario(registroDto);
        this.logger.debug('Usuario registrado exitosamente');
        return usuario;
      } catch (error) {
        this.logger.error('Error al registrar el usuario', error);
        throw error;
      }
    }
  }