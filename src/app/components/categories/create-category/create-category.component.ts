import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category.interface';
import { CategoryService } from 'src/app/services/category/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent implements OnInit {
  createCategoryForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createCategoryForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      description: [''],
    });
  }

  onSubmit(): void {
    let category: Category = {
      name: this.createCategoryForm.get('name')?.value,
      description: this.createCategoryForm.get('description')?.value,
    };

    this.categoryService.createCategory(category).subscribe((data) => {
      console.log(data)
      Swal.fire('Categoria', 'Creada con exito', 'success');
      this.router.navigate(['categories']);
    });
  }
}
