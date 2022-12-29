import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateSubmenuComponent } from './dialog-create-submenu.component';

describe('DialogCreateSubmenuComponent', () => {
  let component: DialogCreateSubmenuComponent;
  let fixture: ComponentFixture<DialogCreateSubmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateSubmenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
