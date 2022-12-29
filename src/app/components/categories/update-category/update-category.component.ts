import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TestScheduler } from 'rxjs/testing';
import { Category } from 'src/app/interfaces/category.interface';
import { CategoryService } from 'src/app/services/category/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css'],
})
export class UpdateCategoryComponent implements OnInit {
  updateCategoryForm!: FormGroup;
  id: number = 0;
  category!: Category;

  constructor(
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateCategoryForm = this.initForm();
    this.activateRoute.params.subscribe((param) => {
      this.id = param['id'];

      this.categoryService.getCategoryById(this.id).subscribe((data) => {
        this.category = data;

        this.updateForm(this.category);
      });
    });
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      description: [''],
    });
  }

  updateForm(category: Category) {
    this.updateCategoryForm.get('name')?.setValue(category.name);
    this.updateCategoryForm.get('description')?.setValue(category.description);
  }

  onSubmit(): void {
    let category: Category = {
      id: this.id,
      name: this.updateCategoryForm.get('name')?.value,
      description: this.updateCategoryForm.get('description')?.value,
    };
    console.log(category);
    this.categoryService.updateCategory(category).subscribe((data: any) => {
      Swal.fire(
        'Categoria',
        'Actualizada con exito',
        'success'
      )
      this.router.navigate(['categories']);
    });
  }
}
