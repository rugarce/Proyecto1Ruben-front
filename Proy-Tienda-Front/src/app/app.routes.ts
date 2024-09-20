import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ProductoComponent } from './components/producto/producto.component';


export const routes: Routes = [
    {
        path: '',
        component: InicioComponent,
        title: 'Home page',
    },
    {
        path: 'producto/:id',
        component: ProductoComponent,
        title: 'Home details',
    },
];
