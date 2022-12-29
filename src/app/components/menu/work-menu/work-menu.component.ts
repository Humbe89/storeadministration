import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Menu } from 'src/app/interfaces/menu.interface';
import { MenuService } from 'src/app/services/menu/menu.service';
import Swal from 'sweetalert2';
import { DialogCreateSubmenuComponent } from '../dialog-create-submenu/dialog-create-submenu.component';

@Component({
  selector: 'app-work-menu',
  templateUrl: './work-menu.component.html',
  styleUrls: ['./work-menu.component.css'],
})
export class WorkMenuComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'category', 'update', 'delete'];
  menus!: MatTableDataSource<any>;
  flag!: boolean;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  id!: any;
  constructor(private menuService: MenuService, private router: Router, public dialog: MatDialog) {}

  openDialog(id: number): void {

    const dialogRef = this.dialog.open(DialogCreateSubmenuComponent, {
      width: '300px',
      height: '280px',
      data: {id: id},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.id = result;
    });
  }

  ngOnInit(): void {
    this.menuService.getMenus().subscribe((data: any) => {
      this.menus = new MatTableDataSource<any>(data);
      console.log(data);
      console.log(this.menus);
      this.menus.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {}

  public createMenu(): void {
    this.router.navigate(['createmenu']);
  }

  public updateCategory(id: any): void {
    this.router.navigate(['updatecategory', id]);
  }

  deleteMenu(id: any) {
    console.log('first');
    this.menuService.deleteMenu(id).subscribe((data) => {
      console.log(data);
      Swal.fire('Menu', 'Eliminado con exito', 'success');
      this.menuService.getMenus().subscribe((data: any) => {
        this.menus = new MatTableDataSource<any>(data);
        this.menus.paginator = this.paginator;
      });
    });
  }
}
