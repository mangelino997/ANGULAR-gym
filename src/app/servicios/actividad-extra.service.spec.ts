import { TestBed } from '@angular/core/testing';

import { ActividadExtraService } from './actividad-extra.service';

describe('ActividadExtraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActividadExtraService = TestBed.get(ActividadExtraService);
    expect(service).toBeTruthy();
  });
});
