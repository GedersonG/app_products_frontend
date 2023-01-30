import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.chargeProducts()
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
      data =>{
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
