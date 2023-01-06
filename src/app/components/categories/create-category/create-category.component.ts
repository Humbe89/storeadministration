import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
  @Output() newEventEmitter = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<CreateCategoryComponent>,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.createCategoryForm = this.initForm();
    console.log(this.createCategoryForm);
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.minLength(4), Validators.required]],
      description: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  closeDialogCreate(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.createCategoryForm.invalid) {
      Swal.fire('Formulario', 'Invalido', 'error');
    } else {
      let category: Category = {
        name: this.createCategoryForm.get('name')?.value,
        description: this.createCategoryForm.get('description')?.value,
      };

      this.categoryService.createCategory(category).subscribe((data) => {
        Swal.fire('Categoria', 'Creada con exito', 'success');
        this.newEventEmitter.emit();
        this.closeDialogCreate();
      });
    }
  }
}
