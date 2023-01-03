import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/interfaces/category.interface';
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
  
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategoriesWithMenuOrSubmenuNull().subscribe(data=>{
      console.log(data)
      this.categories = data;
    })
  }

  onSubmit(form: any){
    console.log(form)
    
  }

  
}