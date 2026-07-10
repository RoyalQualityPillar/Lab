import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RasiHomeComponent } from './rasi-home.component';

describe('RasiHomeComponent', () => {
  let component: RasiHomeComponent;
  let fixture: ComponentFixture<RasiHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RasiHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RasiHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
