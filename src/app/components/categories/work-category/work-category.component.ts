import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, Routes } from '@angular/router';
import { Category } from 'src/app/interfaces/category.interface';
import { CategoryService } from 'src/app/services/category/category.service';
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

  category!: any;
 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  openDialog(id: number) {
    let dialogRef=null
    this.categoryService.getCategoryById(id).subscribe((resp: any)=>{
      this.category = resp;
      dialogRef = this.dialog.open(DialogComponent, {
        data: {category: this.category},
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.category = result;
      });
    })
  

   
  }
    
  



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
    this.router.navigate(['createcategory']);
  }

  public updateCategory(id: any): void {
    this.router.navigate(['updatecategory', id]);
  }

  /**
   * Una ves se halla borrado y se halla cargado la data ahi que volver a igualar el paginador
   * @param id Parametro id para borrar
   */

  deleteCategory(id: any) {
    console.log('first');
    this.categoryService.deleteCategory(id).subscribe((data) => {
      console.log(data);
      Swal.fire('Categoria', 'Eliminada con exito', 'success');
      this.categoryService.getCategories().subscribe((data: any) => {
        this.categories = data;
        this.categories.paginator = this.paginator;
      });
    });
  }
}
