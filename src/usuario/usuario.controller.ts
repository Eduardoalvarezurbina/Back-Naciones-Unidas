import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsuarioService } from './usuario.service';
import { RegistroDto } from './dto/usuario.dto';

@ApiTags('Usuario')
@Controller('usuario')
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) {}

    @Post('registro')
    async registrarUsuario(@Body() registroDto: RegistroDto) {
      return await this.usuarioService.registrarUsuario(registroDto);
    }
  }