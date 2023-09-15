import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Administración')
@Controller('administracion')
export class AdministracionController {

    
    @Get()
    getNombre():string{
        return "Administración"
    }
}
