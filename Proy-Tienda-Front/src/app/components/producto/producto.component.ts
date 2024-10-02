import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { PaginacionComponent } from '../paginacion/paginacion.component';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private productoService: ProductoService, private router: Router, private route: ActivatedRoute) {
    this.changePage(0)
  }

  getAllProductos(){
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

  NavAUpdateProducto(producto: Producto){
    this.router.navigate(['update', producto.id]);
  }

  deleteProducto(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe({
        next: () => {
          //this.productos = this.productos.filter(producto => producto.id !== id);
          this.changePage(0)
          alert('Producto eliminado correctamente');
        },
        error: err => {
          alert('Error al eliminar el producto');
          console.error(err);
        }
      });
    }
  }
}
