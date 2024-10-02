import { Marca } from "./marca";
import { Proveedor } from "./proveedor";
import { Tienda } from "./tienda";

export interface Producto {
    id : number
    nombre: string;
    marca: Marca ;
    proveedor: Proveedor;
    tienda: Tienda;
    precio: number;
    cantidad: number;
}
