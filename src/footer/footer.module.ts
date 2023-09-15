import { Module } from '@nestjs/common';
import { FooterController } from './footer.controller';

@Module({
  controllers: [FooterController]
})
export class FooterModule {}
