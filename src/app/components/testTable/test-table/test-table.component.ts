import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Category } from 'src/app/interfaces/category.interface';
import { Menu } from 'src/app/interfaces/menu.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';


@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.css'],
})
export class TestTableComponent implements OnInit {

  categories: Array<Category> = [];
  name: string = "pepe";
  category!:Category;
  flag!: boolean;
 
  
  constructor(private categoryService: CategoryService,
    public dialogRef: MatDialogRef<TestTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Menu,
    ) {}

  ngOnInit(): void {
     console.log(this.data)
    this.categoryService.getCategoriesWithMenuOrSubmenuNull().subscribe(data=>{
    
      this.categories = data;
    })
  }

 

  onSubmit(form: any){
    console.log(form)
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  
}