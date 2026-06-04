import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpmInitiatorComponent } from './ipm-initiator.component';

describe('IpmInitiatorComponent', () => {
  let component: IpmInitiatorComponent;
  let fixture: ComponentFixture<IpmInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IpmInitiatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpmInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
