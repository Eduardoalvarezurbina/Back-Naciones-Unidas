import { Module } from '@nestjs/common';
import { RegaloController } from './regalo.controller';

@Module({
    controllers:[RegaloController]
})
export class RegaloModule {}
