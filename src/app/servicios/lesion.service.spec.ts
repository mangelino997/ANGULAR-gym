import { TestBed } from '@angular/core/testing';

import { LesionService } from './lesion.service';

describe('LesionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LesionService = TestBed.get(LesionService);
    expect(service).toBeTruthy();
  });
});
