import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmInitiatorComponent } from './cm-initiator.component';

describe('CmInitiatorComponent', () => {
  let component: CmInitiatorComponent;
  let fixture: ComponentFixture<CmInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmInitiatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
