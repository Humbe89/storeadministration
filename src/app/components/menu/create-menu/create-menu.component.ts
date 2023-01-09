import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/interfaces/category.interface';
import { Menu } from 'src/app/interfaces/menu.interface';
import { CategoryService } from 'src/app/services/category/category.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css'],
})
export class CreateMenuComponent implements OnInit {
  categories!: Array<Category>;
  createMenuForm!: FormGroup;
  @Output() newEventEmitter = new EventEmitter<any>();

  activateCategory: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreateMenuComponent>,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.createMenuForm = this.initForm();
    this.categoryService
      .getCategoriesWithMenuOrSubmenuNull()
      .subscribe((data) => {
        this.categories = data;
        console.log(this.categories);
      });
    this.createMenuForm.get('category')?.disable();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      category: ['', [Validators.required]],
    });
  }

  closeDialogCreate(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log(this.createMenuForm);
    if (this.createMenuForm.invalid) {
      Swal.fire('Formulario', 'Invalido', 'error');
    } else {
      let menu: Menu;
      let category: Category;

      if (this.activateCategory == false) {
        menu = {
          name: this.createMenuForm.get('name')?.value,
        };
      } else {
        category = this.createMenuForm.get('category')?.value;
        menu = {
          name: category.name,
          category: this.createMenuForm.get('category')?.value,
        };
      }
      this.menuService.createMenu(menu).subscribe((data) => {
        Swal.fire('Menu', 'Creado con exito', 'success');
        this.closeDialogCreate();
      });
    }
  }

  activate(val: any) {
    if (val) {
      this.createMenuForm.get('name')?.disable();
      this.createMenuForm.get('category')?.enable();
    } else {
      this.createMenuForm.get('category')?.disable();
      this.createMenuForm.get('name')?.enable();
    }
  }
}
