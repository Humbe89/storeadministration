import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/interfaces/product.interface';
import { ModaldetailService } from 'src/app/services/modaldetail/modaldetail.service';
import { ModalUpdateProductService } from 'src/app/services/modalUpdateProduct/modal-update-product.service';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';
import { CreateProductComponent } from '../create-product/create-product.component';
import { DetailProductComponent } from '../detail-product/detail-product.component';
import { UpdateProductComponent } from '../update-product/update-product.component';

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

  valor!: string;
  
  page!: number;

  productDetail!: Product;

  productUpdate!: Product;

  flagModalCreate: boolean = false;

  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private modalDetailService: ModaldetailService,
    public modalUpdateService: ModalUpdateProductService,
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: any)=>{
      this.products = new MatTableDataSource<Product>(data);
      this.products.paginator = this.paginator;
    })
    
}

openCreateProduct(): void {
  const dialogRef = this.dialog.open(CreateProductComponent, {
    width: '1000px',
    height: '490px',
  });

  dialogRef.afterClosed().subscribe((result) => {
    console.log('The dialog was closed');
    this.productService.getProducts().subscribe((data: any)=>{
      this.products = new MatTableDataSource<Product>(data);
      this.products.paginator = this.paginator;
    })
  });
}

openUpdateProduct(product: Product): void {
  const dialogRef = this.dialog.open(UpdateProductComponent, {
    width: '750px',
    height: '470px',
    data: { product: product },
  });

  dialogRef.afterClosed().subscribe((result) => {
    console.log('The dialog was closed');
    this.productService.getProducts().subscribe((data: any)=>{
      this.products = new MatTableDataSource<Product>(data);
      this.products.paginator = this.paginator;
    })
  });
}

openDetailProduct(product: Product): void {
  const dialogRef = this.dialog.open(DetailProductComponent, {
    width: '750px',
    height: '470px',
    data: { product: product },
  });

  dialogRef.afterClosed().subscribe((result) => {
    console.log('The dialog was closed');
    
  });
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


  search(valor: string){
    if(valor)
    {
      this.productService.search(valor).subscribe((data: any)=>{
        this.products = new MatTableDataSource<Product>(data);
        this.products.paginator = this.paginator;
      
    })  
    
    }else{
      this.ngOnInit();
    }
    
    
  }

  

  
}
