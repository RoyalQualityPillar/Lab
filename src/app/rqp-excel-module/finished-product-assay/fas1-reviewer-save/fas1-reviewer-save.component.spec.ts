import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fas1ReviewerSaveComponent } from './fas1-reviewer-save.component';

describe('Fas1ReviewerSaveComponent', () => {
  let component: Fas1ReviewerSaveComponent;
  let fixture: ComponentFixture<Fas1ReviewerSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fas1ReviewerSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fas1ReviewerSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
