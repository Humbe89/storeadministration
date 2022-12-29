import { TestBed } from '@angular/core/testing';

import { ModalUpdateProductService } from './modal-update-product.service';

describe('ModalUpdateProductService', () => {
  let service: ModalUpdateProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalUpdateProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
