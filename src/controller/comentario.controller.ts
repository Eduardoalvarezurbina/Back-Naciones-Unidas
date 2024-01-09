import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { ComentarioDTO } from 'src/dto/comentario.dto';
import { ComentarioEntity } from 'src/entity/comentario.entity';
import { ComentarioService } from 'src/service/comentario.service';


@ApiTags('Comentarios')
@Controller('comentarios')
export class ComentarioController {
  constructor(private readonly comentarioService: ComentarioService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo comentario' })
  @ApiBody({ type: ComentarioDTO, description: 'Datos para crear un nuevo comentario' })
  @ApiCreatedResponse({ description: 'Comentario creado exitosamente', type: ComentarioEntity })
  async crearComentario(@Body() comentarioDto: ComentarioDTO): Promise<ComentarioEntity> {
    return this.comentarioService.crearComentario(comentarioDto);
  }
}