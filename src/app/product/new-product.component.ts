import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  name: string = '';
  price: number = 0;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() { }

  onCreate(): void {
    const product = new Product(this.name, this.price)
    this.productService.save(product).subscribe(
      data => {
        this.toastr.success('Product created!', 'OK', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        })
        this.router.navigate(['/']);
      },
      err => {
        this.toastr.error(err.error.message, 'FAIL', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        })
        this.router.navigate(['/']);
      }
    )
  }
}
