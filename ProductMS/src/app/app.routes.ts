import { Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

export const routes: Routes = [
    { path: 'products', component: ProductsListComponent },
    { path: 'create-product', component: CreateProductComponent },
    { path: 'edit-product/:id', component: EditProductComponent },
];
