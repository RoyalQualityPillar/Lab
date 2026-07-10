import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ras2ReviewerComponent } from './ras2-reviewer.component';

describe('Ras2ReviewerComponent', () => {
  let component: Ras2ReviewerComponent;
  let fixture: ComponentFixture<Ras2ReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ras2ReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ras2ReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
