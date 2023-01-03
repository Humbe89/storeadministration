import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Category } from 'src/app/interfaces/category.interface';
import { Menu } from 'src/app/interfaces/menu.interface';
import { CategoryService } from 'src/app/services/category/category.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { ModalUpdateMenuService } from 'src/app/services/modalUpdateMenu/modal-update-menu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.css'],
})
export class UpdateMenuComponent implements OnInit {
  categories!: Array<Category>;
  @Input() menu!: Menu;
  activatedCategory!: boolean;
  @Output() newEventEmitter = new EventEmitter<any>();
  menuAux!: Menu;

  constructor(
    public modalUpdateMenuService: ModalUpdateMenuService,

    private categoryService: CategoryService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.menuAux = this.menu;

    if (this.menu.category == null) {
      this.activatedCategory = true;
    } else {
      this.activatedCategory = false;
    }

    this.categoryService
      .getCategoriesWithMenuOrSubmenuNull()
      .subscribe((data) => {
        this.categories = data;
        console.log(this.categories);
      });
  }

  closeModal() {
    this.modalUpdateMenuService.closeModal();
  }

  onSubmit(form: any) {
    console.log(form);

    let menu: Menu;
    let category: Category = form.form.controls.category.value;
    if (this.activatedCategory == false) {
      menu = {
        id: this.menu.id,
        name: category.name,
        category: form.form.controls.category.value,
      };
      console.log(menu);
    } else {
      menu = {
        id: this.menu.id,
        name: form.form.controls.name.value,
      };
      console.log(menu);
    }

    this.menuService.updateMenu(menu).subscribe((data) => {
      console.log(data);
      Swal.fire('Menu', 'Actualizado con exito', 'success');
      this.closeModal();
      this.newEventEmitter.emit();
    });
  }
}
