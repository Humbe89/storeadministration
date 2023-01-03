import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Menu } from 'src/app/interfaces/menu.interface';
import { Submenu } from 'src/app/interfaces/submenu.interface';
import { MenuService } from 'src/app/services/menu/menu.service';
import { ModalCreateMenuService } from 'src/app/services/modalCreateMenu/modal-create-menu.service';
import { ModalCreateSubmenuService } from 'src/app/services/modalCreateSubmenu/modal-create-submenu.service';
import { ModalUpdateMenuService } from 'src/app/services/modalUpdateMenu/modal-update-menu.service';
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
  flagCreateCategory: boolean = false;
  menu!: Menu; 
  menuAux!: Menu; 
  constructor(private menuService: MenuService, private router: Router,
     public dialog: MatDialog, public modalCreateMenuService: ModalCreateMenuService,
     public modalUpdateMenuService: ModalUpdateMenuService,
     public modalCreateSubmenuService: ModalCreateSubmenuService
     ) {}

  

  ngOnInit(): void {
    this.menuService.getMenus().subscribe((data: any) => {
      this.menus = new MatTableDataSource<any>(data);
      console.log(data);
      console.log(this.menus);
      this.menus.paginator = this.paginator;
    });
  }

  

  public createMenu(): void {
    this.flagCreateCategory = true;
    this.modalCreateMenuService.openModal();
  }

  public updateMenu(menu: Menu): void {
     this.menu = menu;
     this.modalUpdateMenuService.openModal();
  }

  public createSubmenu(menu: Menu): void{

    this.menuAux=menu;
    console.log(this.menuAux)
    this.modalCreateSubmenuService.openModal();
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
