import { TestBed } from '@angular/core/testing';

import { ModalCreateCategoryService } from './modal-create-category.service';

describe('ModalCreateCategoryService', () => {
  let service: ModalCreateCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalCreateCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
