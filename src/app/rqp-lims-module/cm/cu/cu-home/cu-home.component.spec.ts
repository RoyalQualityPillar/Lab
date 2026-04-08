import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuHomeComponent } from './cu-home.component';

describe('CuHomeComponent', () => {
  let component: CuHomeComponent;
  let fixture: ComponentFixture<CuHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CuHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
