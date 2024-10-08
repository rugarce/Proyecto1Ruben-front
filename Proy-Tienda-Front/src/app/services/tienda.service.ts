import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageResponseDto } from '../models/MessageResponseDto.';
import { Tienda } from '../models/tienda';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  private url= 'http://localhost:8080/tienda/'

  constructor(private http: HttpClient ) { }

  getAll(): Observable<MessageResponseDto<Tienda[]>> {
    console.log("Llamando a get all tiendas")
    return this.http.get<MessageResponseDto<Tienda[]>>(`${this.url}all`);
   }

   getbyID(id: string): Observable<MessageResponseDto<Tienda>> {
    console.log("Llamando a get by idTienda")
    return this.http.get<MessageResponseDto<Tienda>>(`${this.url}${id}`);
   }
}
