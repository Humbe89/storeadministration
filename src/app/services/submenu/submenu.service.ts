import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Submenu } from 'src/app/interfaces/submenu.interface';

@Injectable({
  providedIn: 'root'
})
export class SubmenuService {

  private url: string = 'http://localhost:8080/api_store/submenus';

  constructor(private httpClient: HttpClient) { }

  getMenus(): Observable<Submenu[]> {
    return this.httpClient.get<Submenu[]>(`${this.url}`).pipe(
      map((data: any) => {
        return data.Submenu;
      })
    );
  }

  getMenuById(id: number): Observable<Submenu> {
    return this.httpClient.get<Submenu>(`${this.url}/${id}`).pipe(
      map((data: any) => {
        return data.Menu;
      })
    );
  }

  createMenu(submenu: Submenu): Observable<Submenu> {
    return this.httpClient.post<Submenu>(`${this.url}`, submenu);
  }

  updateMenu(submenu: Submenu): Observable<Submenu> {
    return this.httpClient
      .put<Submenu>(`${this.url}/${submenu.id}`, submenu)
      .pipe(
        map((data: any) => {
          return data.Category;
        })
      );
  }

  deleteMenu(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
