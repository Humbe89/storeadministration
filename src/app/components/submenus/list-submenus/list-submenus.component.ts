import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Submenu } from 'src/app/interfaces/submenu.interface';
import { SubmenuService } from 'src/app/services/submenu/submenu.service';

@Component({
  selector: 'app-list-submenus',
  templateUrl: './list-submenus.component.html',
  styleUrls: ['./list-submenus.component.css']
})
export class ListSubmenusComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'category'];
  submenus = new MatTableDataSource<any>(this.data.submenuList);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<ListSubmenusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private submenuService: SubmenuService
  ) { }

  ngAfterViewInit() {
    this.submenus.paginator = this.paginator;
  }

  ngOnInit(): void {
    console.log(this.submenus);
  }

  closeDialogLIstSubmenu(): void {
    this.dialogRef.close();
  }

}
