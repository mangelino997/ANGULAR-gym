import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LesionComponent } from './lesion.component';

describe('LesionComponent', () => {
  let component: LesionComponent;
  let fixture: ComponentFixture<LesionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LesionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
