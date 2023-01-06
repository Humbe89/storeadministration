import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/interfaces/category.interface';
import { CategoryService } from 'src/app/services/category/category.service';
import { ModalCreateCategoryService } from 'src/app/services/modalCreateCategory/modal-create-category.service';
import { ModalDetailCategoryService } from 'src/app/services/modalDetailCategory/modal-detail-category.service';
import { ModalUpdateCategoryService } from 'src/app/services/modalUpdateCategory/modal-update-category.service';
import Swal from 'sweetalert2';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { DetailCategoryComponent } from '../detail-category/detail-category.component';
import { UpdateCategoryComponent } from '../update-category/update-category.component';

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

  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog,
    public modalCreateCategoryService: ModalCreateCategoryService,
    public modalUpdateCategoryService: ModalUpdateCategoryService,
    public modalDetailCategoryService: ModalDetailCategoryService
  ) {}

  /**
   * Para que me funcione el paginator tengo que inicializarlo en el
   *  OnInit y ponerlo dentro de el subscribe que llama a la data esto es  con observables.
   * Cuando se va hacer el metodo delete ahi que volver a igualar al paginador
   */
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = new MatTableDataSource<Category>(data);
      this.categories.paginator = this.paginator;
    });
  }

  openCreateCategory(): void {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '550px',
      height: '400',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.categoryService.getCategories().subscribe((data: any) => {
        this.categories = new MatTableDataSource<Category>(data);
        console.log(this.categories);
        this.categories.paginator = this.paginator;
      });
    });
  }

  ngAfterViewInit(): void {}

 

  openUpdateCategory(category: Category): void {
    const dialogRef = this.dialog.open(UpdateCategoryComponent, {
      width: '550px',
      height: '400',
      data: { category: category },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

  openDetailCategory(category: Category): void {
    const dialogRef = this.dialog.open(DetailCategoryComponent, {
      width: '550px',
      height: '400',
      data: { category: category },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

  deleteCategory(id: any) {
    this.categoryService.deleteCategory(id).subscribe((data) => {
      this.categoryService.getCategories().subscribe((data: any) => {
        this.categories = new MatTableDataSource<Category>(data);
        this.categories.paginator = this.paginator;
        Swal.fire('Categoria', 'Eliminada con exito', 'success');
      });
    });
  }
}
