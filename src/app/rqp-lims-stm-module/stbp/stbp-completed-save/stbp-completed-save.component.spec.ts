import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StbpCompletedSaveComponent } from './stbp-completed-save.component';

describe('StbpCompletedSaveComponent', () => {
  let component: StbpCompletedSaveComponent;
  let fixture: ComponentFixture<StbpCompletedSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StbpCompletedSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StbpCompletedSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
