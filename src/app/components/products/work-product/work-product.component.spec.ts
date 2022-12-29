import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkProductComponent } from './work-product.component';

describe('WorkProductComponent', () => {
  let component: WorkProductComponent;
  let fixture: ComponentFixture<WorkProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
