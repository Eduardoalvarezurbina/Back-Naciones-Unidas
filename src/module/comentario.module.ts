import { Module } from '@nestjs/common';
import { ComentarioService } from '../service/comentario.service';
import { ComentarioController } from '../controller/comentario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComentarioEntity } from '../entity/comentario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ComentarioEntity]), 
  ],
  providers: [ComentarioService],
  controllers: [ComentarioController],
  exports: [ComentarioService], 
})
export class ComentarioModule {}