import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';
import { MessageResponseDto } from '../models/MessageResponseDto.';
import { ProductoCrear } from '../models/productoCrear';
import { Paginado } from '../models/paginado';

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

   getProducto(id: number): Observable<MessageResponseDto<Producto>>{
    console.log("Llamanda a get producto")
    return this.http.get<MessageResponseDto<Producto>>(`${this.url}${id}`);
   }
   
   getPaginado(numPagina: number, tamPagina: number): Observable<MessageResponseDto<Paginado<Producto>>>{
    console.log("Llamanda a get paginado")
    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.set('NumPagina', numPagina);
    httpParams = httpParams.set('TamanoPagina', tamPagina);
    return this.http.get<MessageResponseDto<Paginado<Producto>>>(`${this.url}pagina`, {params: httpParams});
   }

   anadirProducto(producto: ProductoCrear): Observable<ProductoCrear>{
    console.log("Añadiendo producto", producto);
    return this.http.post<ProductoCrear>(`${this.url}create`,producto);
   }

   actualizarProducto(id: number, producto: ProductoCrear): Observable<ProductoCrear> {
    console.log("Actualizando producto", producto);
    return this.http.put<ProductoCrear>(`${this.url}update/${id}`, producto);
  }

  eliminarProducto(id: number): Observable<MessageResponseDto<string>>{
    console.log("Llamanda a eliminar producto")
    return this.http.delete<MessageResponseDto<string>>(`${this.url}delete/${id}`);
   }

}
