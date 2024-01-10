import { ApiProperty } from '@nestjs/swagger';

export class ComentarioDTO {
  
  @ApiProperty({ 
    description: 'Contenido del comentario', 
    example: 'El mejor vino que he probado, lo recomiendo ' 
  })
  comentario: string;

  @ApiProperty({
    description: 'ID del usuario que realiza el comentario',
    example: 1
  })
  usuario: number;

  @ApiProperty({
    description: 'ID del producto al que se refiere el comentario',
    example: 1
  })
  producto: number;
}