import { Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { ProductoComponent } from "../producto/producto.component";

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterOutlet, ProductoComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

constructor(){

}
}
