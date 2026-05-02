import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpmInitiatorComponent } from './spm-initiator.component';

describe('SpmInitiatorComponent', () => {
  let component: SpmInitiatorComponent;
  let fixture: ComponentFixture<SpmInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpmInitiatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpmInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
