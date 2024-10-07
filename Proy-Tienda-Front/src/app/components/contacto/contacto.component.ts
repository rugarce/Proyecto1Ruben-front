import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactoService } from '../../services/contacto.service';
import { Contacto } from '../../models/contacto';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  selectedFiles: File[]=[];
  correoEnviado = false;
  errorEnvio = false;
  FormularioInvalido = false;
  contactoForm = new FormGroup({
    correo: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    asunto: new FormControl('', Validators.required),
    mensaje: new FormControl('', Validators.required),
    adjunto: new FormControl()
  });
  constructor(private contactoService: ContactoService) { }


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      for (let i = 0; i < input.files.length; i++){
        this.selectedFiles.push(input.files[i]);
      }
    }
  }

  onSubmit() {
    if (this.contactoForm.valid) {
      const formData = this.contactoForm.value;
      const contact: Contacto = {
        correo: formData.correo!,
        nombre: formData.nombre!,
        asunto: formData.asunto!,
        mensaje: formData.mensaje!
      };
      console.log(this.selectedFiles)
      if (this.selectedFiles) {
        this.contactoService.sendEmailwithAttach(contact.correo, contact.nombre, contact.asunto, contact.mensaje, this.selectedFiles).subscribe({
          next: (response) => {
            console.log('Correo enviado ', response);
            this.correoEnviado = true;
            this.errorEnvio = false;
            this.FormularioInvalido = false;
            this.contactoForm.reset();
          },
          error: (err) => {
            this.errorEnvio = true;
            this.correoEnviado = false;
            this.FormularioInvalido = false;
            console.error('Error al enviar el correo:', err);
          }
        });
      } else {
        this.contactoService.sendEmail(contact).subscribe({
          next: (response) => {
            console.log('Correo enviado ', response);
            this.correoEnviado = true;
            this.errorEnvio = true;
            this.FormularioInvalido = false;
            this.contactoForm.reset();
          },
          error: (err) => {
            this.errorEnvio = true;
            this.correoEnviado = false;
            this.FormularioInvalido = false;
            console.error('Error al enviar el correo:', err);
          }
        });
      }
    } else {
      this.FormularioInvalido = true;
      this.correoEnviado = false;
      this.errorEnvio = false;
      console.log('Formulario inválido');
    }
  }


}
