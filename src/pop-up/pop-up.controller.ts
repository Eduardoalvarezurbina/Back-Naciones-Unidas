import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Pop-up')
@Controller('pop-up')
export class PopUpController {

    @Get()
    getNombre():string {
        return "Pop-up : Mayor de 18 años"
    }
}
