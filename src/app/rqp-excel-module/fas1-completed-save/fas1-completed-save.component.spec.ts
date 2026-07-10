import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fas1CompletedSaveComponent } from './fas1-completed-save.component';

describe('Fas1CompletedSaveComponent', () => {
  let component: Fas1CompletedSaveComponent;
  let fixture: ComponentFixture<Fas1CompletedSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fas1CompletedSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fas1CompletedSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
