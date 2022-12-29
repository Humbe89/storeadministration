import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Menu } from 'src/app/interfaces/menu.interface';
import { Submenu } from 'src/app/interfaces/submenu.interface';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private url: string = 'http://localhost:8080/api_store/menus';

  constructor(private httpClient: HttpClient) {}

  getMenus(): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>(`${this.url}`).pipe(
      map((data: any) => {
        return data.Menus;
      })
    );
  }

  getMenuById(id: number): Observable<Menu> {
    return this.httpClient.get<Menu>(`${this.url}/${id}`).pipe(
      map((data: any) => {
        return data.Menu;
      })
    );
  }

  createMenu(menu: Menu): Observable<Menu> {
    return this.httpClient.post<Menu>(`${this.url}`, menu);
  }

  updateMenu(menu: Menu): Observable<Menu> {
    return this.httpClient
      .put<Menu>(`${this.url}/${menu.id}`, menu)
      .pipe(
        map((data: any) => {
          return data.Category;
        })
      );
  }

  deleteMenu(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  addSubmenu(submenu: Submenu, id: number){
   return this.httpClient.post(`${this.url}/${id}`, submenu);
  }
}
