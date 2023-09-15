import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Carro de compras')
@Controller('carro-de-compras')
export class CarroDeComprasController {

    @Get()
    getNombre():string {
        return "Carro de compras"
    }
}
