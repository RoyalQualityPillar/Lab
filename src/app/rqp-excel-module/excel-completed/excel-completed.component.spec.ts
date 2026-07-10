import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelCompletedComponent } from './excel-completed.component';

describe('ExcelCompletedComponent', () => {
  let component: ExcelCompletedComponent;
  let fixture: ComponentFixture<ExcelCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelCompletedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcelCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
