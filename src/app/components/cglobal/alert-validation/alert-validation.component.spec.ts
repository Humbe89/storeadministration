import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertValidationComponent } from './alert-validation.component';

describe('AlertValidationComponent', () => {
  let component: AlertValidationComponent;
  let fixture: ComponentFixture<AlertValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
