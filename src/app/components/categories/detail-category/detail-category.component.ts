import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category.interface';
import { CategoryService } from 'src/app/services/category/category.service';
import { ModalDetailCategoryService } from 'src/app/services/modalDetailCategory/modal-detail-category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.css']
})
export class DetailCategoryComponent implements OnInit {

  @Input() category!: Category;
  fotoSeleccionada!: File;

  constructor( public modalDetailCategoryService: ModalDetailCategoryService, private categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.modalDetailCategoryService.closeModal();
  }
  seleccionarFoto(event: any){
    this.fotoSeleccionada = event.target.files[0];
  }

  subirFoto(){
    this.categoryService.uploadPhoto(this.fotoSeleccionada, this.category.id).subscribe((data: any)=>{
      console.log(data);
      this.category = data.Message;
      Swal.fire('Foto', 'Subida con exito', 'success');
    });
  }

}
