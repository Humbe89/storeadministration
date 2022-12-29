import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { CategoryService } from 'src/app/services/category/category.service';
import { ModalService } from 'src/app/services/modal/modal.service';
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
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    public modalService: ModalService
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
      name: ['helado'],
      description: ['chocolate'],
      price: ['13'],
      amount: ['10'],
      discount: ['2'],
      minStock: ['3'],
      active: [''],
      productstatus: [''],
      category: [''],
    });
  }

  closeModal() {
    this.modalService.closeModal();
    this.createProductForm.reset();
  }

  onSubmit(): void {
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
      this.closeModal();
    });
  }
}
