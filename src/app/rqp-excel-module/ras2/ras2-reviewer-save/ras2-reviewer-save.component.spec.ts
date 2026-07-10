import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ras2ReviewerSaveComponent } from './ras2-reviewer-save.component';

describe('Ras2ReviewerSaveComponent', () => {
  let component: Ras2ReviewerSaveComponent;
  let fixture: ComponentFixture<Ras2ReviewerSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ras2ReviewerSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ras2ReviewerSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
