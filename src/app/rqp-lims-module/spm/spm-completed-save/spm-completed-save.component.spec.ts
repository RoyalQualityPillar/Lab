import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpmCompletedSaveComponent } from './spm-completed-save.component';

describe('SpmCompletedSaveComponent', () => {
  let component: SpmCompletedSaveComponent;
  let fixture: ComponentFixture<SpmCompletedSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpmCompletedSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpmCompletedSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
