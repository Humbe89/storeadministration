import { TestBed } from '@angular/core/testing';

import { ModalCreateMenuService } from './modal-create-menu.service';

describe('ModalCreateMenuService', () => {
  let service: ModalCreateMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalCreateMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
