import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicosComponent } from './academicos.component';

describe('AcademicosComponent', () => {
  let component: AcademicosComponent;
  let fixture: ComponentFixture<AcademicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
