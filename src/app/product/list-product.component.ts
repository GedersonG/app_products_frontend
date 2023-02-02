import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  products: Product[] = [];
  role: string[] = [];
  isAdmin: boolean = false;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.chargeProducts();
    this.role = this.tokenService.getAuthorities();
    this.role.forEach(rol => {
      if (rol == 'ROLE_ADMIN')
        this.isAdmin = true;
    });
  }

  chargeProducts(): void {
    this.productService.list().subscribe(
      data => {
        this.products = data
      },
      err => {
        console.log(err);
      }
    )
  }

  delete(id: any) {
    this.productService.delete(id).subscribe(
      data => {
        this.toastr.success('Product eliminated', 'OK', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        })
        this.chargeProducts();
      },
      err => {
        this.toastr.error(err.error.message, 'FAIL', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        })
      }
    )
  }
}
