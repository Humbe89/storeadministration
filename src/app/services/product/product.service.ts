import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = "http://localhost:8080/api_store/products"

  urlpage: string = "http://localhost:8080/api_store/productspage";

  constructor( private httpClient: HttpClient) { }


  getProducts(): Observable<Product>{
    return this.httpClient.get<Product>(`${this.url}`).pipe(
      map((data: any)=>{
        return data.Products
      })
    )
  }

  getProductsPage(id: number): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.urlpage}/${id}`);
  }

  getProductyById(id: number): Observable<Product>{
    return this.httpClient.get<Product>(`${this.url}/${id}`).pipe(
      
      map((data: any)=>{
        return data.Product;
      })
    );
   }

  createProduct(product: Product): Observable<Product>{
    return this.httpClient.post<Product>(`${this.url}`, product)
  }

  updateProduct(product: Product): Observable<Product>{
    return this.httpClient.put<Product>(`${this.url}/${product.id}`, product);
   }

   deleteProduct(id: number){
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  uploadPhoto(file: File, id: any): Observable<Product>{
    let formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);
    return this.httpClient.post<Product>(`${this.url}/upload`, formData);
  }

  search(valor: string){
    console.log("Estoy en el servicio producto")
   return  this.httpClient.get(`${this.url}/containing/${valor}`)
  }
}
