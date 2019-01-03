import { TestBed } from '@angular/core/testing';

import { SocioService } from './socio.service';

describe('SocioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocioService = TestBed.get(SocioService);
    expect(service).toBeTruthy();
  });
});
