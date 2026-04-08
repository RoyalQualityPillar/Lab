import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaInitiatorComponent } from './ca-initiator.component';

describe('CaInitiatorComponent', () => {
  let component: CaInitiatorComponent;
  let fixture: ComponentFixture<CaInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaInitiatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
