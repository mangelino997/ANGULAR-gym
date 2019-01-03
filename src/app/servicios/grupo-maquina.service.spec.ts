import { TestBed } from '@angular/core/testing';

import { GrupoMaquinaService } from './grupo-maquina.service';

describe('GrupoMaquinaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GrupoMaquinaService = TestBed.get(GrupoMaquinaService);
    expect(service).toBeTruthy();
  });
});
