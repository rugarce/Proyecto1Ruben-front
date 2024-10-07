import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { PaginacionComponent } from '../paginacion/paginacion.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Paginado } from '../../models/paginado';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, PaginacionComponent],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = [];
  paginacion!: Paginado<Producto>;
  alertEliminar=false
  idProdEliminar!: number;

  constructor(private productoService: ProductoService, private router: Router, private route: ActivatedRoute) {
    
  }

  ngOnInit() {
    this.changePage(0);
  }

  getAllProductos() {
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



  changePage(numPage: number) {
    this.productoService.getPaginado(numPage, 12).subscribe({
      next: response => {
        console.log(response)
        this.paginacion = response.message;
      },
      error(err) {
        console.error(err)
      },
      complete() {
        console.log("Llamada finalizada")
      },
    })
  }

  NavAUpdateProducto(producto: Producto) {
    this.router.navigate(['update', producto.id]);
  }

  deleteProducto(id: number): void {
      this.productoService.eliminarProducto(id).subscribe({
        next: () => {
          this.changePage(0)
        },
        error: err => {
          console.error(err);
        }
      });
    }
}
