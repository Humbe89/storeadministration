import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  @Input() product!: Product; 
  @Output() newEventEmiter = new EventEmitter<any>();

  status: Array<string> = ['LOW', 'SPENT', 'FULL'];

  categories: Array<Category> = [];


  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public modalUpdateService: ModalUpdateProductService
  ) {}

  ngOnInit(): void {
    this.updateProductForm = this.initForm();
     this.updateForm(this.product);
     this.categoryService.getCategories().subscribe(data=>{
      this.categories = data;
      console.log(this.categories);
    })
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      description: [''],
      price: [''],
      amount: [''],
      discount: [''],
      minStock: [''],
      active: [''],
      productstatus: [''],
      category: [''],
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
    console.log(this.product.category.name);
  }

  onSubmit(): void {
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
     this.closeModal();
    });
  }

  closeModal(){
    this.modalUpdateService.closeModal();
  }
}
