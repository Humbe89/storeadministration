import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, Routes } from '@angular/router';
import { Category } from 'src/app/interfaces/category.interface';
import { CategoryService } from 'src/app/services/category/category.service';
import { ModalCreateCategoryService } from 'src/app/services/modalCreateCategory/modal-create-category.service';
import { ModalUpdateCategoryService } from 'src/app/services/modalUpdateCategory/modal-update-category.service';
import Swal from 'sweetalert2';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-work-category',
  templateUrl: './work-category.component.html',
  styleUrls: ['./work-category.component.css'],
})
export class WorkCategoryComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'update',
    'delete',
  ];
  categories!: MatTableDataSource<Category>;

  category!: Category;

  flagModalCreate: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    public dialog: MatDialog,
    public modalCreateCategoryService: ModalCreateCategoryService,
    public modalUpdateCategoryService: ModalUpdateCategoryService
  ) {}

  /**
   * Para que me funcione el paginator tengo que inicializarlo en el
   *  OnInit y ponerlo dentro de el subscribe que llama a la data esto es  con observables.
   * Cuando se va hacer el metodo delete ahi que volver a igualar al paginador
   */
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = new MatTableDataSource<Category>(data);

      console.log(this.categories);
      this.categories.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {}

  public createCategory(): void {
    this.flagModalCreate = true;
    this.modalCreateCategoryService.openModal();
  }

  public updateCategory(category: Category): void {
    this.category = category;

    this.modalUpdateCategoryService.openModal();
  }

  deleteCategory(id: any) {
    
    this.categoryService.deleteCategory(id).subscribe((data) => {
      
   console.log(data)
      this.categoryService.getCategories().subscribe((data: any) => {
        this.categories = new MatTableDataSource<Category>(data)
        this.categories.paginator = this.paginator;
        Swal.fire('Categoria', 'Eliminada con exito', 'success');
      });
    });
  }
}
