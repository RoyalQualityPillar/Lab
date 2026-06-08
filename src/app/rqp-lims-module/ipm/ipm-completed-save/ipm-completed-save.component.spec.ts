import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpmCompletedSaveComponent } from './ipm-completed-save.component';

describe('IpmCompletedSaveComponent', () => {
  let component: IpmCompletedSaveComponent;
  let fixture: ComponentFixture<IpmCompletedSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IpmCompletedSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpmCompletedSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
