import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ProductoComponent } from './components/producto/producto.component';
import { AnadirProductoComponent } from './components/anadirProducto/anadirProducto.component';


export const routes: Routes = [
    {
        path: '',
        component: InicioComponent,
        title: 'Home page',
    },
    {
        path: 'producto',
        component: ProductoComponent,
        title: 'Home products',
    },
    {
        path: 'create',
        component: AnadirProductoComponent,
        title: 'Add product'
    }

];
