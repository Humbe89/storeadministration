import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/interfaces/category.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.css'],
})
export class TestTableComponent implements OnInit {

  categories: Array<Category> = [];
  flag: boolean = true;

  
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    
  }

  
}