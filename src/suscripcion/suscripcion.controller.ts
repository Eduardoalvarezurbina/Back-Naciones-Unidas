import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Suscripción')
@Controller('suscripcion')
export class SuscripcionController {
    @Get()
    getNombre(){
        return "Suscripción"
    }
}
