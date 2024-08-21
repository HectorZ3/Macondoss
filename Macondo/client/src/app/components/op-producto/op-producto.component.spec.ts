import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpProductoComponent } from './op-producto.component';

describe('OpProductoComponent', () => {
  let component: OpProductoComponent;
  let fixture: ComponentFixture<OpProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpProductoComponent]
    });
    fixture = TestBed.createComponent(OpProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
