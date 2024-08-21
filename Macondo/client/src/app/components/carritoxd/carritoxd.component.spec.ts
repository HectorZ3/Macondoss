import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoxdComponent } from './carritoxd.component';

describe('CarritoxdComponent', () => {
  let component: CarritoxdComponent;
  let fixture: ComponentFixture<CarritoxdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarritoxdComponent]
    });
    fixture = TestBed.createComponent(CarritoxdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
