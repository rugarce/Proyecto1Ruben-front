import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoFiltrado } from '../../models/ProductoFiltrado';
import { Tienda } from '../../models/tienda';
import { Proveedor } from '../../models/proveedor';
import { Marca } from '../../models/marca';
import { MarcaService } from '../../services/marca.service';
import { TiendaService } from '../../services/tienda.service';
import { ProveedorService } from '../../services/proveedor.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  currentRoute: string | null = null;
  busqueda?: string;
  marcas: Marca[] = [];
  proveedores: Proveedor[] = [];
  tiendas: Tienda[] = [];
  productoFiltrado!: ProductoFiltrado;


  constructor(private router: Router, private marcaService: MarcaService,
    private proveedorService: ProveedorService, private tiendaService: TiendaService, private route: ActivatedRoute) {
    this.getAllMarcas();
    this.getAllProveedores();
    this.getAllTiendas();
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
      if (this.currentRoute === '/') {
        this.resetearFiltros();
      }
    });

    this.route.queryParams.subscribe(params => {
      this.productoFiltrado = {
        nombre: params['nombre'] || null,
        marcas: params['marcas'] ? params['marcas'].split(',') : [],
        proveedores: params['proveedores'] ? params['proveedores'].split(',') : [],
        tiendas: params['tiendas'] ? params['tiendas'].split(',') : [],
        precio: params['precio'] || null,
        cantidad: params['cantidad'] || null
      };
    });
  }

  resetearFiltros() {
    this.productoFiltrado = {
      nombre: null,
      marcas: [],
      proveedores: [],
      tiendas: [],
      precio: null,
      cantidad: null
    };
  }

  navAAnadirProd() {
    this.router.navigate(['/create'])
  }



  aplicarFiltro(nombre?: string, marca?: string, proveedor?: string,
    tienda?: string, precio?: string, cantidad?: string): void {
    var preciof = null;
    var cantidadf = null;
    if (!this.productoFiltrado.marcas) {
      this.productoFiltrado.marcas = [];
    }
    if (!this.productoFiltrado.proveedores) {
      this.productoFiltrado.proveedores = [];
    }
    if (!this.productoFiltrado.tiendas) {
      this.productoFiltrado.tiendas = [];
    }
    if (precio) {
      preciof = parseFloat(precio);
      this.productoFiltrado.precio = preciof;
    }
    if (cantidad) {
      cantidadf = parseInt(cantidad);
      this.productoFiltrado.cantidad = cantidadf;
    }
    if (marca && !this.productoFiltrado.marcas.includes(marca)) {
      this.productoFiltrado.marcas.push(marca);
    }
    if (proveedor && !this.productoFiltrado.proveedores.includes(proveedor)) {
      this.productoFiltrado.proveedores.push(proveedor);
    }
    if (tienda && !this.productoFiltrado.tiendas.includes(tienda)) {
      this.productoFiltrado.tiendas.push(tienda);
    }
    if (nombre) {
      this.productoFiltrado.nombre = nombre;
    }
    this.router.navigate(['/filtro'], {
      queryParams: {
        nombre: this.productoFiltrado.nombre,
        marcas: this.productoFiltrado.marcas ? this.productoFiltrado.marcas.join(',') : null,
        proveedores: this.productoFiltrado.proveedores ? this.productoFiltrado.proveedores.join(',') : null,
        tiendas: this.productoFiltrado.tiendas ? this.productoFiltrado.tiendas.join(',') : null,
        precio: this.productoFiltrado.precio,
        cantidad: this.productoFiltrado.cantidad
      }
    });
  }

  onMarcaChange(event: any, marca: string): void {
    if (!this.productoFiltrado.marcas) {
      this.productoFiltrado.marcas = [];
    }
    if (event.target.checked) {
      this.productoFiltrado.marcas.push(marca);
    } else {
      this.productoFiltrado.marcas = this.productoFiltrado.marcas.filter(m => m !== marca);
    }
    this.aplicarFiltro();
  }

  onTiendaChange(event: any, tienda: string): void {
    if (!this.productoFiltrado.tiendas) {
      this.productoFiltrado.tiendas = [];
    }
    if (event.target.checked) {
      this.productoFiltrado.tiendas.push(tienda);
    } else {
      this.productoFiltrado.tiendas = this.productoFiltrado.tiendas.filter(t => t !== tienda);
    }
    this.aplicarFiltro();
  }

  onProveedorChange(event: any, proveedor: string): void {
    if (!this.productoFiltrado.proveedores) {
      this.productoFiltrado.proveedores = [];
    }
    if (event.target.checked) {
      this.productoFiltrado.proveedores.push(proveedor);
    } else {
      this.productoFiltrado.proveedores = this.productoFiltrado.proveedores.filter(p => p !== proveedor);
    }
    this.aplicarFiltro();
  }

  onPrecioMaxChange(): void {
    const precioInput = document.getElementById('precioMaxInput') as HTMLInputElement;
    const precio = parseFloat(precioInput.value);

    if (precio) {
      console.log('Filtrando por precio máximo:', precio);
      this.productoFiltrado.precio = precio;
      this.aplicarFiltro(); 
    }
  }

  onCantidadChange(): void {
    const cantidadInput = document.getElementById('cantidadInput') as HTMLInputElement;
    const cantidad = parseInt(cantidadInput.value);

    if (cantidad) {
      console.log('Filtrando por cantidad minima:', cantidad);
      this.productoFiltrado.cantidad = cantidad;
      this.aplicarFiltro(); 
    }
  }

  getAllMarcas() {
    console.log("Listado de marcas");
    this.marcaService.getAll().subscribe({
      next: response => {
        console.log(response)
        this.marcas = response.message;
      },
      error(err) {
        console.error(err);
      },
      complete() {
        console.log("Llamada finalizada")
      },
    })
  }

  getAllProveedores() {
    console.log("Listado de proveedores");
    this.proveedorService.getAll().subscribe({
      next: response => {
        console.log(response)
        this.proveedores = response.message;
      },
      error(err) {
        console.error(err);
      },
      complete() {
        console.log("Llamada finalizada")
      },
    })
  }

  getAllTiendas() {
    console.log("Listado de tiendas");
    this.tiendaService.getAll().subscribe({
      next: response => {
        console.log(response)
        this.tiendas = response.message;
      },
      error(err) {
        console.error(err);
      },
      complete() {
        console.log("Llamada finalizada")
      },
    })
  }
}
