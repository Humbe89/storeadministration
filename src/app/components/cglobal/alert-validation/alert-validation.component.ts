import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-validation',
  templateUrl: './alert-validation.component.html',
  styleUrls: ['./alert-validation.component.css']
})
export class AlertValidationComponent implements OnInit {

  @Input() text!: any;

  constructor() { }

  ngOnInit(): void {
    
  }

}
