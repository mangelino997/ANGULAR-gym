import { TestBed } from '@angular/core/testing';

import { GrupoGeneralService } from './grupo-general.service';

describe('GrupoGeneralService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GrupoGeneralService = TestBed.get(GrupoGeneralService);
    expect(service).toBeTruthy();
  });
});
