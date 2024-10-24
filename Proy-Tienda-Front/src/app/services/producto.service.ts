import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';
import { MessageResponseDto } from '../models/MessageResponseDto.';
import { ProductoCrear } from '../models/productoCrear';
import { Paginado } from '../models/paginado';
import { ProductoFiltrado } from '../models/ProductoFiltrado';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url = 'http://localhost:8080/producto/';

  constructor(private http: HttpClient) {

  }

  getAll(): Observable<MessageResponseDto<Producto[]>> {
    console.log("Llamando a get all productos")
    return this.http.get<MessageResponseDto<Producto[]>>(`${this.url}all`);
  }

  getProducto(id: number): Observable<MessageResponseDto<Producto>> {
    console.log("Llamanda a get producto")
    return this.http.get<MessageResponseDto<Producto>>(`${this.url}${id}`);
  }

  getPaginado(numPagina: number, tamanoPagina: number, producto: ProductoFiltrado | null): Observable<MessageResponseDto<Paginado<Producto>>> {
    console.log("Llamanda a get paginado")
    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.set('NumPagina', numPagina);
    httpParams = httpParams.set('TamanoPagina', tamanoPagina);
    if (producto) {
      if (producto.nombre) httpParams = httpParams.set('nombre', producto.nombre);
      if (producto.marcas) httpParams = httpParams.set('marcas', producto.marcas.join(','));
      if (producto.tiendas) httpParams = httpParams.set('tiendas', producto.tiendas.join(','));
      if (producto.proveedores) httpParams = httpParams.set('proveedores', producto.proveedores.join(','));
      if (producto.precio) httpParams = httpParams.set('precio', producto.precio);
      if (producto.cantidad) httpParams = httpParams.set('cantidad', producto.cantidad);
    }
    console.log("Parámetros de la solicitud:", httpParams.toString());

    return this.http.get<MessageResponseDto<Paginado<Producto>>>(`${this.url}pagina`, { params: httpParams });
  }

  anadirProducto(producto: ProductoCrear): Observable<ProductoCrear> {
    console.log("Añadiendo producto", producto);
    return this.http.post<ProductoCrear>(`${this.url}create`, producto);
  }

  actualizarProducto(producto: ProductoCrear): Observable<ProductoCrear> {
    console.log("Actualizando producto", producto);
    return this.http.put<ProductoCrear>(`${this.url}update/${producto.id}`, producto);
  }

  eliminarProducto(id: number): Observable<MessageResponseDto<string>> {
    console.log("Llamanda a eliminar producto")
    return this.http.delete<MessageResponseDto<string>>(`${this.url}delete/${id}`);
  }

  buscarProductos(nombre: string | null = null, marca: string | null = null, tienda: string | null = null, precio: number | null = null, cantidad: number | null = null): Observable<Producto[]> {
    let params = new HttpParams();
    if (nombre) params = params.set('nombre', nombre);
    if (marca) params = params.set('marca.nombre', marca);
    if (tienda) params = params.set('tienda.nombre', tienda);
    if (precio) params = params.set('precio', precio);
    if (cantidad) params = params.set('cantidad', cantidad);

    return this.http.get<Producto[]>(`${this.url}/buscar`, { params });
  }

}
