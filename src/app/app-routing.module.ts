import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailProductComponent } from './product/detail-product.component';
import { EditProductComponent } from './product/edit-product.component';
import { ListProductComponent } from './product/list-product.component';
import { NewProductComponent } from './product/new-product.component';

const routes: Routes = [
  {path: '', component: ListProductComponent},
  {path: 'new', component: NewProductComponent},
  {path: 'update/:id', component: EditProductComponent},
  {path: 'detail/:id', component: DetailProductComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
