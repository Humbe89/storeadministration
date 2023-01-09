import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/interfaces/category.interface';
import { Submenu } from 'src/app/interfaces/submenu.interface';
import { CategoryService } from 'src/app/services/category/category.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-create-submenu',
  templateUrl: './dialog-create-submenu.component.html',
  styleUrls: ['./dialog-create-submenu.component.css'],
})
export class DialogCreateSubmenuComponent implements OnInit {
  categories!: Array<Category>;
  category!: Category;

  constructor(
    public dialogRef: MatDialogRef<DialogCreateSubmenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.categoryService
      .getCategoriesWithMenuOrSubmenuNull()
      .subscribe((data) => {
        this.categories = data;
      });
  }

  closeDialogCreateSubmenu(): void {
    this.dialogRef.close();
  }

  onSubmit(form: any) {
    let submenu: Submenu = {
      name: form.form.controls.category.value.name,
      category: form.form.controls.category.value,
    };
    this.menuService
      .addSubmenu(submenu, this.data.menu.id)
      .subscribe((data) => {
        this.categoryService
          .getCategoriesWithMenuOrSubmenuNull()
          .subscribe((data) => {
            this.categories = data;
            Swal.fire('Submenu', 'Creado con exito', 'success');
            this.closeDialogCreateSubmenu();
          });
      });
  }
}
