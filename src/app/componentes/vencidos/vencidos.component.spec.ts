import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VencidosComponent } from './vencidos.component';

describe('VencidosComponent', () => {
  let component: VencidosComponent;
  let fixture: ComponentFixture<VencidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VencidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VencidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
