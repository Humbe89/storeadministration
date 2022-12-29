import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category.interface';
import { CategoryService } from 'src/app/services/category/category.service';
import { ModalCreateCategoryService } from 'src/app/services/modalCreateCategory/modal-create-category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent implements OnInit {
  createCategoryForm!: FormGroup;
  @Output() newEventEmitter = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    public modalCreateCategoryService: ModalCreateCategoryService
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

  closeModal(){
    this.modalCreateCategoryService.closeModal();
    this.createCategoryForm.reset();
  }

  onSubmit(): void {
    let category: Category = {
      name: this.createCategoryForm.get('name')?.value,
      description: this.createCategoryForm.get('description')?.value,
    };

    this.categoryService.createCategory(category).subscribe((data) => {
      console.log(data)
      Swal.fire('Categoria', 'Creada con exito', 'success');
      this.newEventEmitter.emit();
      this.closeModal();
    });
  }
}
