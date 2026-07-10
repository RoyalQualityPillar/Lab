import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RasiUpateSaveComponent } from './rasi-upate-save.component';

describe('RasiUpateSaveComponent', () => {
  let component: RasiUpateSaveComponent;
  let fixture: ComponentFixture<RasiUpateSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RasiUpateSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RasiUpateSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
