import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Footer')
@Controller('footer')
export class FooterController {

    @Get()
    getNombre():string {
        return "Footer"
    }
}
