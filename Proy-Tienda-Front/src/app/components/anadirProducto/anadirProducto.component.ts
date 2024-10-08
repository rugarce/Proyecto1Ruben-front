import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { Marca } from '../../models/marca';
import { MarcaService } from '../../services/marca.service';
import { Proveedor } from '../../models/proveedor';
import { Tienda } from '../../models/tienda';
import { ProveedorService } from '../../services/proveedor.service';
import { TiendaService } from '../../services/tienda.service';
import { ProductoCrear } from '../../models/productoCrear';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-anadir-producto',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  templateUrl: './anadirProducto.component.html',
  styleUrl: './anadirProducto.component.css',
})
export class AnadirProductoComponent implements OnInit {
  productos: Producto[] = [];
  marcas: Marca[] = [];
  proveedores: Proveedor[] = [];
  tiendas: Tienda[] = [];
  productoEditar: Producto | null = null;
  showSuccessAlert = false; 
  Esconsulta = false;

  productoForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    proveedor: new FormControl('', Validators.required),
    tienda: new FormControl('', Validators.required),
    precio: new FormControl(0, [Validators.min(0), Validators.required]),
    cantidad: new FormControl(0, [Validators.min(0), Validators.required]),
  });

  constructor(private productoService: ProductoService, private marcaService: MarcaService,
    private proveedorService: ProveedorService, private tiendaService: TiendaService, private router: Router, private route: ActivatedRoute
  ) {
    this.getAllMarcas();
    this.getAllProveedores();
    this.getAllTiendas();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const isUpdate = this.route.snapshot.url.some(segment => segment.path == 'update');
      if (id) {
        this.productoService.getProducto(parseInt(id)).subscribe({
          next: response => {
            console.log("Producto a cargar en el formulario: ",response.message)
            this.productoEditar = response.message;
            this.productoForm.patchValue({
              nombre: this.productoEditar.nombre,
              marca: this.productoEditar.marca.id.toString(),
              proveedor: this.productoEditar.proveedor.id.toString(),
              tienda: this.productoEditar.tienda.id.toString(),
              precio: this.productoEditar.precio,
              cantidad: this.productoEditar.cantidad,
            });
          },
          error(err) {
            console.error('Error al cargar el producto:', err);
          }
        })
        if(!isUpdate){
          this.productoForm.disable();
          this.Esconsulta= true;
        }
      } else {
        this.productoEditar=null;
        this.productoForm.reset();
      }
    });
  }

  getAllProductos() {
    console.log("Listado de productos")
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

  crearProducto() {
    if (this.productoForm.valid) {
      const formData = this.productoForm.value;

      const nuevoProducto: ProductoCrear = {
        nombre: formData.nombre!,
        id_marca: parseInt(formData.marca!),
        id_tienda: parseInt(formData.tienda!),
        id_proveedor: parseInt(formData.proveedor!),
        cantidad: formData.cantidad!,
        precio: formData.precio!,
      };
      console.log(nuevoProducto);

      if (this.productoEditar) {
        this.productoService.actualizarProducto(this.productoEditar.id, nuevoProducto).subscribe({
          next: (response) => {
            console.log('Producto actualizado:', response);
            this.showSuccessAlert = true;
          },
          error: (err) => {
            console.error('Error al actualizar producto:', err);
          }
        });
      } else {
        this.productoService.anadirProducto(nuevoProducto).subscribe({
          next: (response) => {
            console.log('Producto creado:', response);
            this.router.navigate(['update', response]);
          },
          error: (err) => {
            console.error('Error al crear producto:', err);
          }
        });
      }
    } else {
      console.log("Formulario no valido");
    }
  }
}
