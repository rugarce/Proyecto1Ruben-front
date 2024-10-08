import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageResponseDto } from '../models/MessageResponseDto.';
import { Proveedor } from '../models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private url= 'http://localhost:8080/proveedor/'

  constructor(private http: HttpClient ) { }

  getAll(): Observable<MessageResponseDto<Proveedor[]>> {
    console.log("Llamando a get all proveedores")
    return this.http.get<MessageResponseDto<Proveedor[]>>(`${this.url}all`);
   }

   getbyID(id: string): Observable<MessageResponseDto<Proveedor>> {
    console.log("Llamando a get by idProveedor")
    return this.http.get<MessageResponseDto<Proveedor>>(`${this.url}${id}`);
   }
}
