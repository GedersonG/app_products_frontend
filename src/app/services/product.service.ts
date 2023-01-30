import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  PRODUCT_URI = 'http://localhost:8080/product';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.PRODUCT_URI);
  }
  
  public getById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.PRODUCT_URI + `/${id}`);
  }

  public getByName(name: string): Observable<Product> {
    return this.httpClient.get<Product>(this.PRODUCT_URI + `/name/${name}`);
  }
  
  public save(product: Product): Observable<any> {
    return this.httpClient.post<any>(this.PRODUCT_URI, product)
  }

  public update(id:number, product: Product): Observable<any>{
    return this.httpClient.put<any>(this.PRODUCT_URI + `/update/${id}`, product)
  }

  public delete(id:number): Observable<any>{
    return this.httpClient.delete<any>(this.PRODUCT_URI + `/delete/${id}`)
  }
}
