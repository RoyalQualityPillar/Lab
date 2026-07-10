import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RasiInitComponent } from './rasi-init.component';

describe('RasiInitComponent', () => {
  let component: RasiInitComponent;
  let fixture: ComponentFixture<RasiInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RasiInitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RasiInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
