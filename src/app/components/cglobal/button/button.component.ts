import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() classButton: string = '';
  @Input() name: string = '';
  @Input() claIcon: string = '';
  @Input() typeButton: string = 'button';

  constructor() { }

  ngOnInit(): void {
  }

}
