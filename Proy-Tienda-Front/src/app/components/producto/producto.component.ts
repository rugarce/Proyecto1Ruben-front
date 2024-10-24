import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { PaginacionComponent } from '../paginacion/paginacion.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Paginado } from '../../models/paginado';
import { ProductoFiltrado } from '../../models/ProductoFiltrado';
import { EtiquetasFiltroComponent } from '../etiquetas-filtro/etiquetas-filtro.component';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, PaginacionComponent, EtiquetasFiltroComponent],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = [];
  paginacion!: Paginado<Producto>;
  alertEliminar = false;
  alertFiltroVacio=false;
  idProdEliminar!: number;
  isLoading = false;
  productoFiltrado: ProductoFiltrado | null= null;


  constructor(private productoService: ProductoService, private router: Router, private route: ActivatedRoute) {

  }


  ngOnInit() {
    if (this.router.url.includes('filtro')) {
      this.route.queryParams.subscribe(params => {
        this.productoFiltrado = {
          nombre: params['nombre'] || null,
          marcas: params['marcas'] ? params['marcas'].split(',') : null,
          proveedores: params['proveedores'] ? params['proveedores'].split(',') : null,
          tiendas: params['tiendas'] ? params['tiendas'].split(',') : null,
          precio: params['precio'] ||null,
          cantidad: params['cantidad'] ||null
        };

        this.filtrarProductos(this.productoFiltrado);
      });
    } else {
      this.productoFiltrado=null;
      this.changePage(0);
    }

    this.route.queryParams.subscribe(params => {
      if (params['alertEliminar']) {
        this.alertEliminar = true;
        setTimeout(() => {
          this.alertEliminar = false;
        }, 5000);
      }
    });
  }

  filtrarProductos(productoFiltrado: ProductoFiltrado) {
    this.alertFiltroVacio=false;
    this.isLoading = true;
    this.router.navigate(['/filtro'], {
      queryParams: {
        nombre: productoFiltrado.nombre,
        marcas: productoFiltrado.marcas ? productoFiltrado.marcas.join(',') : null,
        proveedores: productoFiltrado.proveedores ? productoFiltrado.proveedores.join(',') : null,
        tiendas: productoFiltrado.tiendas ? productoFiltrado.tiendas.join(',') : null,
        precio: productoFiltrado.precio,
        cantidad: productoFiltrado.cantidad
      }
    });
    this.productoService.getPaginado(0, 12, productoFiltrado).subscribe({
        next: response => {
          this.paginacion = response.message;
          if(this.paginacion.contenido.length==0){
            this.alertFiltroVacio=true;
          }
        },
        error: err => {
          console.error(err);
        },
        complete: () => {
          console.log("Llamada finalizada")
          this.isLoading = false;
        }
      });
  }

  scrollToFirstLine(): void {
    const scroll = document.getElementById('primera linea');
    if (scroll) {
      scroll.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
    this.isLoading = true;
    this.productoService.getPaginado(numPage, 12, this.productoFiltrado).subscribe({
      next: response => {
        console.log(response)
        this.paginacion = response.message;
        this.scrollToFirstLine();
      },
      error(err) {
        console.error(err)
      },
      complete: () => {
        this.isLoading = false;
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
        this.alertEliminar = true;
        setTimeout(() => {
          this.alertEliminar = false;
        }, 5000);
      },
      error: err => {
        console.error(err);
      }
    });
  }
}
