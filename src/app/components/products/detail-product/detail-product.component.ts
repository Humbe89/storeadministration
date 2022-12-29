import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ModaldetailService } from 'src/app/services/modaldetail/modaldetail.service';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
})
export class DetailProductComponent implements OnInit {
  flag: boolean = true;

  @Input() product!: Product;

   fotoSeleccionada!: File;

  constructor(public modalDetailService: ModaldetailService, private productService: ProductService) {}

  ngOnInit(): void {}

  closeModal() {
    this.modalDetailService.closeModal();
  }

  seleccionarFoto(event: any){
    this.fotoSeleccionada = event.target.files[0];
  }

  subirFoto(){
    this.productService.uploadPhoto(this.fotoSeleccionada, this.product.id).subscribe((data: any)=>{
      console.log(data);
      this.product = data.Message;
      Swal.fire('Foto', 'Subida con exito', 'success');
    });
  }
}

export interface DialogData{
  animal: string;
  name: string;
}
