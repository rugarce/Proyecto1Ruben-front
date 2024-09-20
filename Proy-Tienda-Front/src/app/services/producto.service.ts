import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';
import { MessageResponseDto } from '../models/MessageResponseDto.';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url = 'localhost:8080/producto/';

  constructor(private http: HttpClient) {

   }

   getAll(): Observable<MessageResponseDto<Producto[]>> {
    console.log("Llamando a get all productos")
    return this.http.get<MessageResponseDto<Producto[]>>(`${this.url}all`);
   }

   getProducto(id: number): Observable<MessageResponseDto<Producto>>{
    console.log("Llamanda a get producto")
    return this.http.get<MessageResponseDto<Producto>>('${id}');
   }
}
