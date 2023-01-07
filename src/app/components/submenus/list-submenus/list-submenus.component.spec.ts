import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubmenusComponent } from './list-submenus.component';

describe('ListSubmenusComponent', () => {
  let component: ListSubmenusComponent;
  let fixture: ComponentFixture<ListSubmenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSubmenusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSubmenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
