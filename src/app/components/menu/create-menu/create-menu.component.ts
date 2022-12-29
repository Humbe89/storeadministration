import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category.interface';
import { Menu } from 'src/app/interfaces/menu.interface';
import { Submenu } from 'src/app/interfaces/submenu.interface';
import { CategoryService } from 'src/app/services/category/category.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { SubmenuService } from 'src/app/services/submenu/submenu.service';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css'],
})
export class CreateMenuComponent implements OnInit {
  categories!: Array<Category>;
  createMenuForm!: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private menuService: MenuService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createMenuForm = this.initForm();
    this.categoryService.getCategories().subscribe((data) => {
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

  onSubmit(): void {
    let menu: Menu;
    let category: Category;
    if(this.createMenuForm.get('category')?.value == ''){
       menu ={
        name: this.createMenuForm.get('name')?.value,
        
      }
    }else{
      category = this.createMenuForm.get('category')?.value;
       menu = {
        name: category.name,
        category: this.createMenuForm.get('category')?.value
      }
    }

    this.menuService.createMenu(menu).subscribe(data=>{
      console.log(data);
      this.router.navigate(['menus']);
    })
      
    }
   
  }

