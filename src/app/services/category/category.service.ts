import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Category } from 'src/app/interfaces/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url: string = 'http://localhost:8080/api_store/categories';
  constructor(private httpClient: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.url}`).pipe(
      map((data: any) => {
        return data.Categories;
      })
    );
  }

  getCategoryById(id: number): Observable<Category> {
    return this.httpClient.get<Category>(`${this.url}/${id}`).pipe(
      map((data: any) => {
        return data.Category;
      })
    );
  }

  createCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(`${this.url}`, category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.httpClient
      .put<Category>(`${this.url}/${category.id}`, category)
      .pipe(
        map((data: any) => {
          return data.Category;
        })
      );
  }

  deleteCategory(id: number){
    console.log("estoy en el servicio")
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  uploadPhoto(file: File, id: any): Observable<Category>{
    let formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);
    return this.httpClient.post<Category>(`${this.url}/upload`, formData);
  }
  
  getCategoriesWithMenuOrSubmenuNull():Observable<Category[]>{
   return this.httpClient.get<Category[]>(`${this.url}/null`);
  }
}
