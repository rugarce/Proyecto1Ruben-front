import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageResponseDto } from '../models/MessageResponseDto.';
import { Contacto } from '../models/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private url = 'http://localhost:8080/contacto/';

  constructor(private http: HttpClient) { }


  sendEmail(contacto : Contacto): Observable<MessageResponseDto<string>> {
    console.log("Llamando send email")
    return this.http.post<MessageResponseDto<string>>(`${this.url}enviar-mail`,contacto);
   }

   sendEmailwithAttach(correo: string,nombre:string ,asunto: string, mensaje:string, attachments: File[]): Observable<MessageResponseDto<string>> {
    console.log("Llamando sendEmailwithAttach")
    const formData = new FormData();
    formData.append('correo', correo);       
    formData.append('nombre', nombre);       
    formData.append('asunto', asunto);       
    formData.append('mensaje', mensaje);
    attachments.forEach(attachment => {
      formData.append('attachments', attachment);
    });
    return this.http.post<MessageResponseDto<string>>(`${this.url}enviar-mailAdjunto`,formData);
   }

}
