import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { ProductGuardService as guard } from './guards/product-guard.service';
import { IndexComponent } from './index/index.component';
import { DetailProductComponent } from './product/detail-product.component';
import { EditProductComponent } from './product/edit-product.component';
import { ListProductComponent } from './product/list-product.component';
import { NewProductComponent } from './product/new-product.component';


const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: ListProductComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'detail/:id', component: DetailProductComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'new', component: NewProductComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'update/:id', component: EditProductComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
