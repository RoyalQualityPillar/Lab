import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RasiUpdateComponent } from './rasi-update.component';

describe('RasiUpdateComponent', () => {
  let component: RasiUpdateComponent;
  let fixture: ComponentFixture<RasiUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RasiUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RasiUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
