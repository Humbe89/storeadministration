import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalCreateSubmenuService {

  modal!: boolean;

  constructor() { }

  openModal(){
    this.modal = true;
  }

  closeModal(){
    this.modal = false;
  }
}
