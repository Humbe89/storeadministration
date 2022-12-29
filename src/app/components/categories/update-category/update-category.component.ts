import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TestScheduler } from 'rxjs/testing';
import { Category } from 'src/app/interfaces/category.interface';
import { CategoryService } from 'src/app/services/category/category.service';
import { ModalCreateCategoryService } from 'src/app/services/modalCreateCategory/modal-create-category.service';
import { ModalUpdateCategoryService } from 'src/app/services/modalUpdateCategory/modal-update-category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css'],
})
export class UpdateCategoryComponent implements OnInit {
  updateCategoryForm!: FormGroup;

  @Input() category!: Category;

  @Output() newEventEmitter = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router,
    public modalUpdateCategoryService: ModalUpdateCategoryService
  ) {}

  ngOnInit(): void {
    console.log(this.category);
    this.updateCategoryForm = this.initForm();
    this.updateForm();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      description: [''],
    });
  }

  closeModal(): void {
    this.modalUpdateCategoryService.closeModal();
  }

  updateForm() {
    this.updateCategoryForm.get('name')?.setValue(this.category.name);
    this.updateCategoryForm
      .get('description')
      ?.setValue(this.category.description);
  }

  onSubmit(): void {
    let category: Category = {
      id: this.category.id,
      name: this.updateCategoryForm.get('name')?.value,
      description: this.updateCategoryForm.get('description')?.value,
    };

    this.categoryService.updateCategory(category).subscribe((data: any) => {
      Swal.fire('Categoria', 'Actualizada con exito', 'success');
      this.newEventEmitter.emit();
      this.closeModal();
    });
  }
}
