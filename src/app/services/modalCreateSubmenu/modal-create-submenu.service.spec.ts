import { TestBed } from '@angular/core/testing';

import { ModalCreateSubmenuService } from './modal-create-submenu.service';

describe('ModalCreateSubmenuService', () => {
  let service: ModalCreateSubmenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalCreateSubmenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
