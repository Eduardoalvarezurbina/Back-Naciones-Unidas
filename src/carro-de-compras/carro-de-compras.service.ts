import { Injectable } from "@nestjs/common";
import { ProductoEntity } from "src/producto/producto.entity";
import { CajaEntity } from "src/caja/caja.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CarroDeComprasDto } from "./dto/carro-de-compras.dto";


@Injectable()
export class CarroDeComprasService {
  constructor(
    @InjectRepository(ProductoEntity)
    private readonly productoRepository: Repository<ProductoEntity>,
    @InjectRepository(CajaEntity)
    private readonly cajaRepository: Repository<CajaEntity>,
  ) {}

  async verificarStock(carrito: CarroDeComprasDto[]): Promise<{ carritoSinStockProducto: number[]; carritoSinStockCaja: number[]; carritoConStock: { idProducto?: number; cantidadProducto?: number; idCaja?: number; cantidadCaja?: number }[] }> {
    const carritoSinStockProducto: number[] = [];
    const carritoSinStockCaja: number[] = [];
    const carritoConStock: { idProducto?: number; cantidadProducto?: number; idCaja?: number; cantidadCaja?: number }[] = [];
  
    for (const item of carrito) {
      if (item.idProducto && item.cantidadProducto) {
        for (let i = 0; i < item.idProducto.length; i++) {
          try {
            const producto = await this.obtenerProductoPorId(item.idProducto[i]);
  
            if (!producto) {
              carritoSinStockProducto.push(item.idProducto[i]);
            } else if (producto.cantidad < item.cantidadProducto[i]) {
              carritoSinStockProducto.push(item.idProducto[i]);
            } else {
              const productoConStock = {
                idProducto: item.idProducto[i],
                cantidadProducto: item.cantidadProducto[i]
              };
              carritoConStock.push(productoConStock);
            }
          } catch (error) {
            console.log('Error al obtener el producto:', error);
          }
        }
      }
  
      if (item.idCaja && item.cantidadCaja) {
        for (let i = 0; i < item.idCaja.length; i++) {
          try {
            const caja = await this.obtenerCajaPorId(item.idCaja[i]);
  
            if (!caja) {
              carritoSinStockCaja.push(item.idCaja[i]);
            } else if (caja.cantidad < item.cantidadCaja[i]) {
              carritoSinStockCaja.push(item.idCaja[i]);
            } else {
              const cajaConStock = {
                idCaja: item.idCaja[i],
                cantidadCaja: item.cantidadCaja[i]
              };
              carritoConStock.push(cajaConStock);
            }
          } catch (error) {
            console.log('Error al obtener la caja:', error);
          }
        }
      }
    }
  
    const respuesta = { carritoSinStockProducto, carritoSinStockCaja, carritoConStock };
    return respuesta;
  }

  private async obtenerProductoPorId(id: number): Promise<ProductoEntity | undefined> {
    const producto = await this.productoRepository.findOne({ where: { id } });
    return producto;
  }

  private async obtenerCajaPorId(id: number): Promise<CajaEntity | undefined> {
    const caja = await this.cajaRepository.findOne({ where: { id } });
    return caja;
  }
}