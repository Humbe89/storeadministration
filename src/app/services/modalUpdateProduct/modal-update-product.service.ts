import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUpdateProductService {

  modal: boolean = false;

  constructor() { }

  openModal(){
    this.modal = true;
  }

  closeModal(){
    this.modal = false;
  }
}
