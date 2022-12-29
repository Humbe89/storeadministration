import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorProductComponent } from './paginator-product.component';

describe('PaginatorProductComponent', () => {
  let component: PaginatorProductComponent;
  let fixture: ComponentFixture<PaginatorProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginatorProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginatorProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
