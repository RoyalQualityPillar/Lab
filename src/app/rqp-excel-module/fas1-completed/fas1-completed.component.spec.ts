import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fas1CompletedComponent } from './fas1-completed.component';

describe('Fas1CompletedComponent', () => {
  let component: Fas1CompletedComponent;
  let fixture: ComponentFixture<Fas1CompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fas1CompletedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fas1CompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
