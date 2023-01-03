import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category.interface';
import { Menu } from 'src/app/interfaces/menu.interface';
import { Submenu } from 'src/app/interfaces/submenu.interface';
import { CategoryService } from 'src/app/services/category/category.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { ModalCreateMenuService } from 'src/app/services/modalCreateMenu/modal-create-menu.service';
import { SubmenuService } from 'src/app/services/submenu/submenu.service';
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
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private menuService: MenuService,
    private router: Router,
    public modalCreateMenuService: ModalCreateMenuService
  ) {}

  ngOnInit(): void {
    this.createMenuForm = this.initForm();
    this.categoryService.getCategoriesWithMenuOrSubmenuNull().subscribe((data) => {
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

  closeModal() {
    this.modalCreateMenuService.closeModal();
  }

  onSubmit(): void {
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
      console.log(data);
      Swal.fire('Menu', 'Creado con exito', 'success');
      
      console.log(menu);
      this.closeModal();
      this.categoryService.getCategoriesWithMenuOrSubmenuNull().subscribe(data=>{
        this.categories = data;
        this.newEventEmitter.emit();
      })
    
    });
  }
}
