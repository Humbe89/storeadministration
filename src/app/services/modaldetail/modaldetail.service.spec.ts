import { TestBed } from '@angular/core/testing';

import { ModaldetailService } from './modaldetail.service';

describe('ModaldetailService', () => {
  let service: ModaldetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModaldetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
