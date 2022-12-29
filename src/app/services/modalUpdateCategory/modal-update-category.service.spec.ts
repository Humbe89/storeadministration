import { TestBed } from '@angular/core/testing';

import { ModalUpdateCategoryService } from './modal-update-category.service';

describe('ModalUpdateCategoryService', () => {
  let service: ModalUpdateCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalUpdateCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
