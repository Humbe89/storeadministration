import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/interfaces/product.interface';
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

  constructor(
    public dialogRef: MatDialogRef<DetailProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService
  ) {}

  ngOnInit(): void {}

  closeDialogDetails(): void {
    this.dialogRef.close();
  }

  seleccionarFoto(event: any) {
    this.fotoSeleccionada = event.target.files[0];
  }

  subirFoto() {
    this.productService
      .uploadPhoto(this.fotoSeleccionada, this.data.product.id)
      .subscribe((data: any) => {
        console.log(data);
        this.data.product = data.Message;
        Swal.fire('Foto', 'Subida con exito', 'success');
      });
  }
}
