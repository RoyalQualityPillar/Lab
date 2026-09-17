import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StbpInitiatorComponent } from './stbp-initiator.component';

describe('StbpInitiatorComponent', () => {
  let component: StbpInitiatorComponent;
  let fixture: ComponentFixture<StbpInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StbpInitiatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StbpInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
