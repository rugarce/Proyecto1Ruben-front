import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { PaginacionComponent } from '../paginacion/paginacion.component';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, PaginacionComponent],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  productos: Producto[] = [];
  productosPagina: Producto[] = [];

  constructor(private productoService: ProductoService) {
    console.log("Consultar productos")
    this.productoService.getAll().subscribe({
      next: response => {
        console.log(response)
        this.productos = response.message;
      },
      error(err) {
        console.error(err)
      },
      complete() {
        console.log("Llamada finalizada")
      },
    })
    this.productoService.getPaginado(0,12).subscribe({
      next: response => {
        console.log(response)
        this.productosPagina = response.message;
      },
      error(err) {
        console.error(err)
      },
      complete() {
        console.log("Llamada finalizada")
      },
    })
  }

  changePage(numPage: number){
    this.productoService.getPaginado(numPage,12).subscribe({
      next: response => {
        console.log(response)
        this.productosPagina = response.message;
      },
      error(err) {
        console.error(err)
      },
      complete() {
        console.log("Llamada finalizada")
      },
    })
  }






}
