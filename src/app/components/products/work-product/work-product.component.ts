import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { CategoryService } from 'src/app/services/category/category.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModaldetailService } from 'src/app/services/modaldetail/modaldetail.service';
import { ModalUpdateProductService } from 'src/app/services/modalUpdateProduct/modal-update-product.service';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-work-product',
  templateUrl: './work-product.component.html',
  styleUrls: ['./work-product.component.css'],
})
export class WorkProductComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'price',
    'update',
    'delete',
  ];
  products!: MatTableDataSource<Product>;
  
  page!: number;

  productDetail!: Product;

  productUpdate!: Product;

  flagModalCreate: boolean = false;

  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private modalDetailService: ModaldetailService,
    public modalUpdateService: ModalUpdateProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: any)=>{
      this.products = new MatTableDataSource<Product>(data);
      this.products.paginator = this.paginator;
    })
    
}

  createProduct(): void {
    this.flagModalCreate = true;
   this.modalService.openModal();
  }

  updateProduct(product: Product): void {
    console.log(product)
    this.productUpdate = product;
     this.modalUpdateService.openModal();
  }

  deleteProduct(id: any): void {
    
    this.productService.deleteProduct(id).subscribe((data) => {
      console.log(data);
      this.productService.getProducts().subscribe((data: any) => {
        this.products = new MatTableDataSource<any>(data)
        this.products.paginator = this.paginator;
        Swal.fire('Producto', 'Eliminado con exito', 'success');
      });
    });
  }

  showDetail(product: Product) {
    this.productDetail = product;
    this.modalDetailService.openModal();
  }

  

  
}
