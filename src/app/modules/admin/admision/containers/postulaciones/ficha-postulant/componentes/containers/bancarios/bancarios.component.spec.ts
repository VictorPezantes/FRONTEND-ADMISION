import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancariosComponent } from './bancarios.component';

describe('BancariosComponent', () => {
  let component: BancariosComponent;
  let fixture: ComponentFixture<BancariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BancariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BancariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
