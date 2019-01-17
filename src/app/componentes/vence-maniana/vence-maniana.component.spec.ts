import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenceManianaComponent } from './vence-maniana.component';

describe('VenceManianaComponent', () => {
  let component: VenceManianaComponent;
  let fixture: ComponentFixture<VenceManianaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenceManianaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenceManianaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
