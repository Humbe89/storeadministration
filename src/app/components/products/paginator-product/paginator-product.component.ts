import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginator-product',
  templateUrl: './paginator-product.component.html',
  styleUrls: ['./paginator-product.component.css']
})
export class PaginatorProductComponent implements OnInit {

  @Input() paginator!: any;

  pages: Array<number>=[];

  constructor() { }

  ngOnInit(): void {
   for (let index = 0; index < this.paginator.totalPages; index++) {
     this.pages.push(index);    
   }
   console.log(this.pages)
   console.log(this.paginator.number)
  }

}
