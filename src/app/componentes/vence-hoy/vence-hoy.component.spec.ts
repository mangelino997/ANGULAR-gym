import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenceHoyComponent } from './vence-hoy.component';

describe('VenceHoyComponent', () => {
  let component: VenceHoyComponent;
  let fixture: ComponentFixture<VenceHoyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenceHoyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenceHoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
