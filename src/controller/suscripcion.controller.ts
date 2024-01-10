import { BadRequestException, Body, Controller, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { AuthGuard } from 'src/autenticacion/auth.guard';
import { Permisos } from 'src/autenticacion/permisos.decorador';
import { PermisosGuard } from 'src/autenticacion/permisos.guard';
import { Roles } from 'src/autenticacion/roles.decorador';
import { RolesGuard } from 'src/autenticacion/roles.guard';
import { SuscripcionInputDto } from 'src/dto/suscripcion-input.dto';
import { SuscripcionOutputDto } from 'src/dto/suscripcion-output.dto';
import { InvitadoEntity } from 'src/entity/invitado.entity';
import { UsuarioEntity } from 'src/entity/usuario.entity';
import { SuscripcionService } from 'src/service/suscripcion.service';
import { Repository } from 'typeorm';
 // Asegúrate de importar tus guards

@ApiTags('Suscripción')
@Controller('suscripcion')
export class SuscripcionController {
  private readonly logger = new Logger(SuscripcionController.name);
  constructor(
    private readonly suscripcionService: SuscripcionService, 
    private readonly jwtService: JwtService,
    @InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(InvitadoEntity)
    private invitadoRepository: Repository<InvitadoEntity>,
  ) {}

  @UseGuards(AuthGuard, RolesGuard, PermisosGuard)
  @ApiOperation({ summary: 'Crear nueva suscripción' })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: SuscripcionOutputDto })
  @ApiResponse({ status: 400, description: 'Solicitud inválida' })
  @ApiBearerAuth()
  @ApiBody({ type: SuscripcionInputDto, description: 'Datos para crear la nueva suscripción' })
  @Post()
  @Roles('usuario', 'invitado')
  @Permisos('crear-suscripcion')
  async crearSuscripcion(@Req() req: Request, @Body() suscripcionInputDto: SuscripcionInputDto): Promise<SuscripcionOutputDto> {
    const token = req.headers.authorization?.split(' ')[1];
    const payload = this.jwtService.verify(token, { secret: '1234567' });
    
    const idUsuario = payload['id'];
    const idInvitado = payload['id'];
    
  
   
    const usuario = await this.usuarioRepository.findOne({ where: { id: idUsuario } });
    const invitado = await this.invitadoRepository.findOne({ where: { id: idInvitado } });
  
    const nuevaSuscripcion = await this.suscripcionService.crearSuscripcion(suscripcionInputDto, idUsuario, idInvitado);
    console.log(`idUsuario: ${idUsuario}, idInvitado: ${idInvitado}`);
    this.logger.debug('Suscripción creada');
    return nuevaSuscripcion;
}

}