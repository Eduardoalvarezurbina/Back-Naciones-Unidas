import { Module } from '@nestjs/common';
import { PopUpController } from './pop-up.controller';

@Module({
  controllers: [PopUpController]
})
export class PopUpModule {}
