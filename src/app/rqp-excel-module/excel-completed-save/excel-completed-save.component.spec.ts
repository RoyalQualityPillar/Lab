import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelCompletedSaveComponent } from './excel-completed-save.component';

describe('ExcelCompletedSaveComponent', () => {
  let component: ExcelCompletedSaveComponent;
  let fixture: ComponentFixture<ExcelCompletedSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelCompletedSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcelCompletedSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
