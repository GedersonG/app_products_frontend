import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {

  product: Product = null as any;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.productService.getById(id).subscribe(
      data => {
        this.product = data
      },
      err => {
        this.toastr.error(err.error.message, 'FAIL', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        })
        this.back()
      })
  }

  back() {
    this.router.navigate(['/']);
  }
}
