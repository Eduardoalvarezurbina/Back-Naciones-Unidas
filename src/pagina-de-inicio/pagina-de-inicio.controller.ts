import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Página de inicio')
@Controller('pagina-de-inicio')
export class PaginaDeInicioController {

    @Get()
    getNombre():string {
        return "Pagina de inicio"
    }
}
