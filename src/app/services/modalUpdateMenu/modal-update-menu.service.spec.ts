import { TestBed } from '@angular/core/testing';

import { ModalUpdateMenuService } from './modal-update-menu.service';

describe('ModalUpdateMenuService', () => {
  let service: ModalUpdateMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalUpdateMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
