import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/interfaces/category.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { CategoryService } from 'src/app/services/category/category.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  category!: Category;

   photoSelected!: File;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService
  ) { 

  }

  ngOnInit(): void {
    console.log("data es-->", this.data.category);
    this.category = this.data.category
    console.log(this.category)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectPhoto(event: any){
    this.photoSelected = event.target.files[0];
  }

  uploadPhoto(){
     this.categoryService.uploadPhoto(this.photoSelected, this.category.id).subscribe((data: any)=>{
      console.log(data);
      this.category = data.Message;
      Swal.fire('Foto', 'Subida con exito', 'success');
    }); 
  }

}
