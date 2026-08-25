import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fas1ReviewerComponent } from './fas1-reviewer.component';

describe('Fas1ReviewerComponent', () => {
  let component: Fas1ReviewerComponent;
  let fixture: ComponentFixture<Fas1ReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fas1ReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fas1ReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
