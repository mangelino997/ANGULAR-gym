import { TestBed } from '@angular/core/testing';

import { SubopcionPestaniaService } from './subopcion-pestania.service';

describe('SubopcionPestaniaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubopcionPestaniaService = TestBed.get(SubopcionPestaniaService);
    expect(service).toBeTruthy();
  });
});
