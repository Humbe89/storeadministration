import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { CategoryService } from 'src/app/services/category/category.service';
import { ModalUpdateProductService } from 'src/app/services/modalUpdateProduct/modal-update-product.service';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  updateProductForm!: FormGroup;
  product!: Product;
  @Output() newEventEmiter = new EventEmitter<any>();

  status: Array<string> = ['LOW', 'SPENT', 'FULL'];

  categories: Array<Category> = [];


  constructor(
    public dialogRef: MatDialogRef<UpdateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    public modalUpdateService: ModalUpdateProductService
  ) {}

  ngOnInit(): void {
    this.product = this.data.product;
    console.log(this.product)
    this.updateProductForm = this.initForm();
     this.updateForm(this.product);
     this.categoryService.getCategories().subscribe(data=>{
      this.categories = data;
    })
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      minStock: ['', [Validators.required]],
      active: [''],
      productstatus: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  updateForm(product: Product) {
    this.updateProductForm.get('name')?.setValue(product.name);
    this.updateProductForm.get('description')?.setValue(product.description);
    this.updateProductForm.get('price')?.setValue(product.price);
    this.updateProductForm.get('amount')?.setValue(product.amount);
    this.updateProductForm.get('minStock')?.setValue(product.minStock);
    this.updateProductForm.get('discount')?.setValue(product.discount);
    this.updateProductForm.get('active')?.setValue(product.active);
    this.updateProductForm
      .get('productstatus')
      ?.setValue(product.productstatus);
    this.updateProductForm.get('category')?.setValue(product.category.name);
    
  }

  closeDialogUpdate(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {

    if(this.updateProductForm.invalid){
      Swal.fire('Formulario', 'Invalido', 'error');
    }else{
      let product: Product = {
        id: this.product.id,
        name: this.updateProductForm.get('name')?.value,
        description: this.updateProductForm.get('description')?.value,
        price: this.updateProductForm.get('price')?.value,
        amount: this.updateProductForm.get('amount')?.value,
        discount: this.updateProductForm.get('discount')?.value,
        minStock: this.updateProductForm.get('minStock')?.value,
        active: this.updateProductForm.get('active')?.value,
        productstatus: this.updateProductForm.get('productstatus')?.value,
        category: this.updateProductForm.get('category')?.value,
      };
      console.log(product);
      this.productService.updateProduct(product).subscribe((data: any) => {
        console.log(data.Product);
        Swal.fire('Producto', 'Actualizado con exito', 'success');
        this.newEventEmiter.emit();
       this.closeDialogUpdate();
      });
    }

    
  }

}
