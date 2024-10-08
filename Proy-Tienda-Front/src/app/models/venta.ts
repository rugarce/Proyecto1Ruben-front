import { Cliente } from "./cliente";
import { Producto } from "./producto";

export interface Venta{
    id: number,
    cliente: Cliente,
    producto: Producto
}