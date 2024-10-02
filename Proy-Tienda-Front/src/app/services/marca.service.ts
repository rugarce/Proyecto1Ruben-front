import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageResponseDto } from '../models/MessageResponseDto.';
import { Marca } from '../models/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private url= 'http://localhost:8080/marca/'

  constructor(private http: HttpClient ) { }

  getAll(): Observable<MessageResponseDto<Marca[]>> {
    console.log("Llamando a get all productos")
    return this.http.get<MessageResponseDto<Marca[]>>(`${this.url}all`);
   }

   getbyID(id: string): Observable<MessageResponseDto<Marca>> {
    console.log("Llamando a get by idMarca")
    return this.http.get<MessageResponseDto<Marca>>(`${this.url}${id}`);
   }

}
