import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/interfaces/category.interface';
import { Menu } from 'src/app/interfaces/menu.interface';
import { Submenu } from 'src/app/interfaces/submenu.interface';
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
  
  active!: boolean;
 
 
  updateMenuForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    
    this.updateMenuForm = this.initForm();
     
    if (this.data.menu.category == null) {
      this.updateMenuForm.get('category')?.disable();
      this.updateMenuForm.get('name')?.setValue(this.data.menu.name);
      this.active = false;
    } else {
      this.updateMenuForm.get('name')?.disable();
      this.updateMenuForm.get('category')?.setValue(this.data.menu.category.name);
      this.active = true;
      console.log(this.active)
    }

    this.categoryService
      .getCategoriesWithMenuOrSubmenuNull()
      .subscribe((data) => {
        this.categories = data;
      }); 
  }


  initForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      category: ['', [Validators.required]],
    });
  }

  closeDialogUpdate(): void {
    this.dialogRef.close();
  }

  

  activate(val: any) {
    console.log(val)
    if (val) {
      this.updateMenuForm.get('name')?.disable();
      this.updateMenuForm.get('category')?.enable();
    } else {
      this.updateMenuForm.get('category')?.disable();
      this.updateMenuForm.get('name')?.enable();
    }
  }

  onSubmit() {
     let menu: Menu;
    if (this.updateMenuForm.get('category')?.value) {
      menu = {
        id: this.data.menu.id,
        name: this.updateMenuForm.get('category')?.value.name,
        category: this.updateMenuForm.get('category')?.value,
        submenuList: this.data.menu.submenuList,
      };
    } else {
      menu = {
        id: this.data.menu.id,
        name: this.updateMenuForm.get('name')?.value,
        category: undefined,
        submenuList: this.data.menu.submenuList,
      };
    }
    
    this.menuService.updateMenu(menu).subscribe((data) => {
      console.log(data);
      Swal.fire('Menu', 'Actualizado con exito', 'success');
      this.closeDialogUpdate();
    });
 
    /* let menu: Menu;
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
        submenuList: this.menu.submenuList
      }

    }
      //console.log(menu)
      this.menuService.updateMenu(menu).subscribe((data) => {
      console.log(data);
      Swal.fire('Menu', 'Actualizado con exito', 'success');
      this.closeModal();
      this.newEventEmitter.emit();
    });   */
  }
}
