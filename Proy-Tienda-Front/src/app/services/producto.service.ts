import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';
import { MessageResponseDto } from '../models/MessageResponseDto.';

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
    return this.http.get<MessageResponseDto<Producto>>(`${this.url}all${id}`);
   }
   
   getPaginado(numPagina: number, tamPagina: number): Observable<MessageResponseDto<Producto[]>>{
    console.log("Llamanda a get paginado")
    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.set('NumPagina', numPagina);
    httpParams = httpParams.set('TamanoPagina', tamPagina);
    return this.http.get<MessageResponseDto<Producto[]>>(`${this.url}pagina`, {params: httpParams});
   }

   anadirProducto(producto: Producto): Observable<Producto>{
    console.log("Añadiendo producto")
    return this.http.post<Producto>(`${this.url}create`,producto);
   }

   
}
