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
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { TestTableComponent } from '../../testTable/test-table/test-table.component';
import { style } from '@angular/animations';
import { CreateMenuComponent } from '../create-menu/create-menu.component';
import { UpdateMenuComponent } from '../update-menu/update-menu.component';

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
  modalRef: MdbModalRef<TestTableComponent> | null = null;
  constructor(private menuService: MenuService, private router: Router,
     public dialog: MatDialog, public modalCreateMenuService: ModalCreateMenuService,
     public modalUpdateMenuService: ModalUpdateMenuService,
     public modalCreateSubmenuService: ModalCreateSubmenuService,
     private modalService: MdbModalService
     ) {}

  

  ngOnInit(): void {
    this.menuService.getMenus().subscribe((data: any) => {
      this.menus = new MatTableDataSource<any>(data);
      this.menus.paginator = this.paginator;
      console.log(this.menus)
    });
  }

  openCreateMenu(): void {
    const dialogRef = this.dialog.open(CreateMenuComponent, {
      width: '550px',
      height: '400',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

  openUpdateMenu(menu: Menu): void {
    const dialogRef = this.dialog.open(UpdateMenuComponent, {
      width: '550px',
      height: '400',
      data: { menu: menu },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

  openCreateSubmenu(menu: Menu): void {
    const dialogRef = this.dialog.open(DialogCreateSubmenuComponent, {
      width: '550px',
      height: '400',
      data: { menu: menu },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }


  public updateMenu(menu: Menu): void {
     this.menu = menu;
     this.modalUpdateMenuService.openModal();
  }

  
  deleteMenu(id: any) {
    this.menuService.deleteMenu(id).subscribe((data) => {      
      Swal.fire('Menu', 'Eliminado con exito', 'success');
      this.ngOnInit();
    });
  }
}
