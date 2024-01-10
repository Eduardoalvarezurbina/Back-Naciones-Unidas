import { Injectable, Logger } from "@nestjs/common";
import { ProductoEntity } from "src/entity/producto.entity";
import { CajaEntity } from "src/entity/caja.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CarroDeComprasInputDto } from "../dto/carro-de-compras-input.dto";
import { CarroDeComprasEntity } from "../entity/carro-de-compras.entity";
import { CarroDeComprasOutputDto } from "../dto/carro-de-compras-output.dto";
import { InvitadoEntity } from "src/entity/invitado.entity";
import { UsuarioEntity } from "src/entity/usuario.entity";
import { ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Carro de compras')
@Injectable()
export class CarroDeComprasService {
  constructor(
    @InjectRepository(ProductoEntity)
    private readonly productoRepository: Repository<ProductoEntity>,
    @InjectRepository(CajaEntity)
    private readonly cajaRepository: Repository<CajaEntity>,
    @InjectRepository(CarroDeComprasEntity)
    private readonly carroDeComprasRepository: Repository<CarroDeComprasEntity>,
    @InjectRepository(InvitadoEntity)
    private readonly invitadoRepository: Repository<InvitadoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>
  ) {}
  private readonly logger = new Logger(CarroDeComprasService.name);
  
  @ApiParam({ name: 'carrito', description: 'Array de productos y cajas para verificar stock' })
  @ApiResponse({ status: 200, description: 'Verificación de stock exitosa' })
  async verificarStock(carrito: CarroDeComprasInputDto[]): Promise<{ carritoSinStockProducto: number[]; carritoSinStockCaja: number[]; carritoConStock: { idProducto?: number; cantidadProducto?: number; idCaja?: number; cantidadCaja?: number }[] }> {
    this.logger.debug('Verificando stock');
    const carritoSinStockProducto: number[] = [];
    const carritoSinStockCaja: number[] = [];
    const carritoConStock: { idProducto?: number; cantidadProducto?: number; idCaja?: number; cantidadCaja?: number }[] = [];
  
    for (const item of carrito) { //Recorre el carrito
      if (item.idProducto && item.cantidadProducto) { //Si hay productos en el carrito
       
        for (let i = 0; i < item.idProducto.length; i++) {
          try {
            const producto = await this.obtenerProductoPorId(item.idProducto[i]); //Obtiene el producto por ID
  
            if (!producto) { //Si no existe el producto, lo agrega al array de productos sin stock
              carritoSinStockProducto.push(item.idProducto[i]);
            } else if (producto.cantidad < item.cantidadProducto[i]) { //Si la cantidad del producto es menor a la cantidad del carrito, lo agrega al array de productos sin stock
              carritoSinStockProducto.push(item.idProducto[i]);
            } else { //Si hay stock, agrega el producto al array de productos con stock
              const productoConStock = {
                idProducto: item.idProducto[i],
                cantidadProducto: item.cantidadProducto[i]
              };
              carritoConStock.push(productoConStock);
            }
          } catch (error) {
            this.logger.error('Error al obtener el producto:', error);
            
          }
        }
      }
  
      if (item.idCaja && item.cantidadCaja) { //Si hay cajas en el carrito
        for (let i = 0; i < item.idCaja.length; i++) {
          try {
            const caja = await this.obtenerCajaPorId(item.idCaja[i]); //Obtiene la caja por ID
  
            if (!caja) { //Si no existe la caja, la agrega al array de cajas sin stock
              carritoSinStockCaja.push(item.idCaja[i]);
            } else if (caja.cantidad < item.cantidadCaja[i]) { //Si la cantidad de la caja es menor a la cantidad del carrito, la agrega al array de cajas sin stock
              carritoSinStockCaja.push(item.idCaja[i]);
            } else { //Si hay stock, agrega la caja al array de cajas con stock
              const cajaConStock = {
                idCaja: item.idCaja[i],
                cantidadCaja: item.cantidadCaja[i]
              };
              carritoConStock.push(cajaConStock);
            }
          } catch (error) {
            this.logger.error('Error al obtener la caja:', error);
            
          }
        }
      }
    }
  
    const respuesta = { carritoSinStockProducto, carritoSinStockCaja, carritoConStock }; 
    
    this.logger.debug('Verificación de stock completada');
    return respuesta;
  }
  
  @ApiParam({ name: 'carritoConStock', description: 'Array de productos y cajas con stock' })
  @ApiParam({ name: 'id', description: 'ID del carrito' })
  @ApiResponse({ status: 201, description: 'Carrito guardado en la base de datos' })
  async guardarCarritoEnBaseDeDatos(carritoConStock: any[],id): Promise<CarroDeComprasEntity[]> { //Guarda el carrito en la base de datos
    this.logger.debug('Guardando carrito en la base de datos');
    const carritoEntityArray = await Promise.all(carritoConStock.map(async item => { //Recorre el carrito con stock
      
      const carroDeComprasEntity = new CarroDeComprasEntity();
      carroDeComprasEntity.idProducto = item.idProducto;
      carroDeComprasEntity.idCaja = item.idCaja;
      carroDeComprasEntity.cantidadProducto = item.cantidadProducto !== undefined ? item.cantidadProducto : 0;
      carroDeComprasEntity.cantidadCaja = item.cantidadCaja !== undefined ? item.cantidadCaja : 0;
      carroDeComprasEntity.idCarrito = id;
      // Guardar la entidad en la base de datos
      await this.carroDeComprasRepository.save(carroDeComprasEntity);
      this.logger.debug('Carrito guardado en la base de datos');
      return carroDeComprasEntity;
    }));
  
    return carritoEntityArray;
  }
  @ApiParam({ name: 'id', description: 'ID del producto' })
  private async obtenerProductoPorId(id: number): Promise<ProductoEntity | undefined> { //Obtiene el producto por ID
    this.logger.debug('Obteniendo producto por ID');
    const producto = await this.productoRepository.findOne({ where: { id } });
    return producto;
  }

  @ApiParam({ name: 'id', description: 'ID de la caja' })
  private async obtenerCajaPorId(id: number): Promise<CajaEntity | undefined> { //Obtiene la caja por ID
    this.logger.debug('Obteniendo caja por ID');
    const caja = await this.cajaRepository.findOne({ where: { id } });
    return caja;
  }
  

}