import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit{

  product: Product = new Product("xd", 2);

  constructor(private productService: ProductService) { }

  ngOnInit(){
    const id = 1;
    this.productService.getById(id).subscribe(
      data => {
        this.product = data
      },
      err => {
        console.log(err);
      }
    )
  }
}
