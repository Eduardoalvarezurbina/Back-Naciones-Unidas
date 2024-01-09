import { ApiProperty } from '@nestjs/swagger';

export class ComentarioDTO {
  
  @ApiProperty({ 
    description: 'Contenido del comentario', 
    example: 'El mejor vino que he probado, lo recomiendo ' 
  })
  comentario: string;
}