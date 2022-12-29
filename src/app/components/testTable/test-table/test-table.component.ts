import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.css'],
})
export class TestTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'description'];
  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * Para que me funcione el paginator tengo que inicializarlo en el
   *  OnInit y ponerlo dentro de el subscribe que llama a la data esto es  con observables.
   */
  ngAfterViewInit() {
   // this.dataSource.paginator = this.paginator;

    console.log('afterviewinit');
  }

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource<Product>(data);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
    });
    

    console.log('afterviewinit');
    //console.log(this.dataSource)
  }

  loadList() {
    this.productService.getProducts().subscribe((data: any) => {
      console.log(data);
      this.dataSource = data;
      console.log(this.dataSource);
    });
  }
}

export interface Client {
  id: number;
  name: string;
  description: string;
}

const clients: Array<Client> = [
  {
    id: 1,
    name: 'Humberto',
    description: 'Developer',
  },
  {
    id: 2,
    name: 'Humberto',
    description: 'Developer',
  },
  {
    id: 3,
    name: 'Humberto',
    description: 'Developer',
  },
  {
    id: 4,
    name: 'Humberto',
    description: 'Developer',
  },
  {
    id: 5,
    name: 'Humberto',
    description: 'Developer',
  },
  {
    id: 6,
    name: 'Humberto',
    description: 'Developer',
  },
  {
    id: 7,
    name: 'Humberto',
    description: 'Developer',
  },
  {
    id: 8,
    name: 'Humberto',
    description: 'Developer',
  },
  {
    id: 9,
    name: 'Humberto',
    description: 'Developer',
  },
  {
    id: 10,
    name: 'Humberto',
    description: 'Developer',
  },
  {
    id: 11,
    name: 'Humberto',
    description: 'Developer',
  },
  {
    id: 12,
    name: 'Humberto',
    description: 'Developer',
  },
  {
    id: 13,
    name: 'Humberto',
    description: 'Developer',
  },
  {
    id: 14,
    name: 'Humberto',
    description: 'Developer',
  },
  {
    id: 15,
    name: 'Humberto',
    description: 'Developer',
  },
];
