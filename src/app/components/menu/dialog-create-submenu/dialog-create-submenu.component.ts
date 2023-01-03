import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category.interface';
import { Menu } from 'src/app/interfaces/menu.interface';
import { Submenu } from 'src/app/interfaces/submenu.interface';
import { CategoryService } from 'src/app/services/category/category.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { ModalCreateSubmenuService } from 'src/app/services/modalCreateSubmenu/modal-create-submenu.service';
import Swal from 'sweetalert2';
import { DialogData } from '../../products/detail-product/detail-product.component';

@Component({
  selector: 'app-dialog-create-submenu',
  templateUrl: './dialog-create-submenu.component.html',
  styleUrls: ['./dialog-create-submenu.component.css'],
})
export class DialogCreateSubmenuComponent implements OnInit {
  categories!: Array<Category>;
  category!: Category;
  @Input() menuAux!: Menu;
  id!: any;
  @Output() newEventEmitter = new EventEmitter<any>();

  constructor(
    private categoryService: CategoryService,
    private menuService: MenuService,
    public modalCreateSubmenuService: ModalCreateSubmenuService
  ) {}

  ngOnInit(): void {
    this.id = this.menuAux.id;
    console.log(this.menuAux);
    this.categoryService
      .getCategoriesWithMenuOrSubmenuNull()
      .subscribe((data) => {
        this.categories = data;
      });
  }

  closeModal() {
    this.modalCreateSubmenuService.closeModal();
  }

  onSubmit(form: any) {
    console.log(form);

    let submenu: Submenu = {
      name: form.form.controls.category.value.name,
      category: form.form.controls.category.value,
    };
    console.log(submenu);
    this.menuService.addSubmenu(submenu, this.id).subscribe((data) => {
      this.categoryService
        .getCategoriesWithMenuOrSubmenuNull()
        .subscribe((data) => {
          this.categories = data;
          this.modalCreateSubmenuService.closeModal();
          this.newEventEmitter.emit();
        });
    });
  }
}
