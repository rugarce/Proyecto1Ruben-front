import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ProductoComponent } from './components/producto/producto.component';
import { AnadirProductoComponent } from './components/anadirProducto/anadirProducto.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { SobrenosotrosComponent } from './components/sobrenosotros/sobrenosotros.component';


export const routes: Routes = [
    {
        path: 'contacto',
        component: ContactoComponent,
        title: 'Contact'
    },
    {
        path: 'aboutUs',
        component: SobrenosotrosComponent,
        title: 'About us'
    },
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
    },
    {
        path: 'update/:id',
        component: AnadirProductoComponent,
        title: 'Edit product'
    },
    {
        path: ':id',
        component: AnadirProductoComponent,
        title: 'Get product'
    }
];
