import { Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { ProductoComponent } from "../producto/producto.component";
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterOutlet, ProductoComponent,MenuComponent, FooterComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

constructor(){

}
}
