import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fas1InitiatorComponent } from './fas1-initiator.component';

describe('Fas1InitiatorComponent', () => {
  let component: Fas1InitiatorComponent;
  let fixture: ComponentFixture<Fas1InitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fas1InitiatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fas1InitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
