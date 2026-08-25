import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WslrInitiatorComponent } from './wslr-initiator.component';

describe('WslrInitiatorComponent', () => {
  let component: WslrInitiatorComponent;
  let fixture: ComponentFixture<WslrInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WslrInitiatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WslrInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
