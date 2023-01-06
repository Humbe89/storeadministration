import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/interfaces/category.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  createProductForm!: FormGroup;

  categories: Array<Category> = [];
  status: Array<string> = ['LOW', 'SPENT', 'FULL'];

  @Output() newItemEvent = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<CreateProductComponent>,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.createProductForm = this.initForm();
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
      console.log(this.categories);
    });
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      name: ['helado', [Validators.required]],
      description: ['chocolate', [Validators.required]],
      price: ['13', [Validators.required]],
      amount: ['10', [Validators.required]],
      discount: ['2', [Validators.required]],
      minStock: ['3', [Validators.required]],
      active: [''],
      productstatus: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  closeDialogCreate(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.createProductForm.invalid) {
      Swal.fire('Formulario', 'Invalido', 'error');
    } else {
      let product: Product = {
        name: this.createProductForm.get('name')?.value,
        description: this.createProductForm.get('description')?.value,
        price: this.createProductForm.get('price')?.value,
        amount: this.createProductForm.get('amount')?.value,
        discount: this.createProductForm.get('discount')?.value,
        minStock: this.createProductForm.get('minStock')?.value,
        active: this.createProductForm.get('active')?.value,
        productstatus: this.createProductForm.get('productstatus')?.value,
        category: this.createProductForm.get('category')?.value,
      };
      console.log(product);
      this.productService.createProduct(product).subscribe((data) => {
        console.log(data);

        Swal.fire('Producto', 'Creado con exito', 'success');
        this.newItemEvent.emit();
        this.closeDialogCreate();
      });
    }
  }
}
