import { TestBed } from '@angular/core/testing';

import { ModalDetailCategoryService } from './modal-detail-category.service';

describe('ModalDetailCategoryService', () => {
  let service: ModalDetailCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalDetailCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
