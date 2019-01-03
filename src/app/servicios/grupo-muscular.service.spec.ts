import { TestBed } from '@angular/core/testing';

import { GrupoMuscularService } from './grupo-muscular.service';

describe('GrupoMuscularService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GrupoMuscularService = TestBed.get(GrupoMuscularService);
    expect(service).toBeTruthy();
  });
});
