import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category.interface';
import { Submenu } from 'src/app/interfaces/submenu.interface';
import { CategoryService } from 'src/app/services/category/category.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import Swal from 'sweetalert2';
import { DialogData } from '../../products/detail-product/detail-product.component';

@Component({
  selector: 'app-dialog-create-submenu',
  templateUrl: './dialog-create-submenu.component.html',
  styleUrls: ['./dialog-create-submenu.component.css'],
})
export class DialogCreateSubmenuComponent implements OnInit {
  categories!: Array<Category>;
  createSubmenuForm!: FormGroup;
  id!: number;

  constructor(
    public dialogRef: MatDialogRef<DialogCreateSubmenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private menuService: MenuService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createSubmenuForm = this.initForm();
    this.id = this.data.id;
    console.log(this.id);
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data;
      console.log(this.categories);
    });
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      category: [''],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log(this.createSubmenuForm.value);
    let submenu: Submenu;
    let category: Category = this.createSubmenuForm.get('category')?.value;

    submenu = {
      name: category.name,
      category: category,
    };
    console.log(submenu);

    this.menuService.addSubmenu(submenu, this.id).subscribe((data) => {
      console.log(data);
  
      //this.router.navigate(['menus']);
    });
    //Swal.fire('Submenu', 'Creado con exito', 'success');
  }
}
