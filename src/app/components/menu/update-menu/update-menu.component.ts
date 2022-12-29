import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  updateMenuForm!: FormGroup;
  categories!: Array<Category>;
  @Input() menu!: Menu;

  constructor(
    public modalUpdateMenuService: ModalUpdateMenuService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.updateMenuForm = this.initForm();
    this.updateForm();
    this.categoryService.getCategories().subscribe(data=>{
      this.categories = data;
    })
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      category: [' '],
    });
  }

  updateForm() {
    this.updateMenuForm.get('name')?.setValue(this.menu.name);
    this.updateMenuForm.get('category')?.setValue(this.menu.category?.name);
  }

  closeModal() {
    console.log(this.updateMenuForm.get('category')?.value)
    this.modalUpdateMenuService.closeModal();
  }

  onSubmit() {
    let menu: Menu;
    let category: Category = this.updateMenuForm.get('category')?.value;
    console.log(category.name)
     if(this.updateMenuForm.get('category')?.value == 'n'){
       menu ={
        id: this.menu.id,
        name: this.updateMenuForm.get('name')?.value,
        
      }
    }else{
      //category = this.updateMenuForm.get('category')?.value;
       menu = {
        id: this.menu.id,
        name: category.name,
        category: this.updateMenuForm.get('category')?.value
      }
    }
     
     this.menuService.updateMenu(menu).subscribe(data=>{
      console.log(data);
      Swal.fire('Menu', 'Actualizado con exito', 'success');
      
      this.closeModal();
    })  
  }
}
