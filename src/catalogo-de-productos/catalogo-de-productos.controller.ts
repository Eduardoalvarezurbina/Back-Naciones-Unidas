import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Catálogo de productos')
@Controller('catalogo-de-productos')
export class CatalogoDeProductosController {

    @Get()
    getNombre():string {
        return "Catálogo de productos"
    }
}
