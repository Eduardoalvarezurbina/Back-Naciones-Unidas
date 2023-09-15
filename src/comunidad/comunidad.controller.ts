import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comunidad')
@Controller('comunidad')
export class ComunidadController {

    @Get()
    getNombre():string {
        return "Comunidad"
    }
}
