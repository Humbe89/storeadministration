import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TestScheduler } from 'rxjs/testing';
import { Category } from 'src/app/interfaces/category.interface';
import { Menu } from 'src/app/interfaces/menu.interface';
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
  category!: Category
  

  

  @Output() newEventEmitter = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<UpdateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,   
    private categoryService: CategoryService,
    
  ) {}

  ngOnInit(): void {
    console.log(this.data)
    this.category = this.data.category
    this.updateCategoryForm = this.initForm();
    this.updateForm();

  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
 
  updateForm() {
    this.updateCategoryForm.get('name')?.setValue(this.category.name);
    this.updateCategoryForm
      .get('description')
      ?.setValue(this.category.description);
  }

  closeDialogUpdate(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.updateCategoryForm.invalid) {
      Swal.fire('Formulario', 'Invalido', 'error');
    } else {
      let category: Category = {
        id: this.category.id,
        name: this.updateCategoryForm.get('name')?.value,
        description: this.updateCategoryForm.get('description')?.value,
      };

      this.categoryService.updateCategory(category).subscribe((data: any) => {
        Swal.fire('Categoria', 'Actualizada con exito', 'success');
        this.newEventEmitter.emit();
        this.closeDialogUpdate();
      });
    }
  }
}
