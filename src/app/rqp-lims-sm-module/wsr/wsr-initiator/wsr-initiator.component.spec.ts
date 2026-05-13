import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsrInitiatorComponent } from './wsr-initiator.component';

describe('WsrInitiatorComponent', () => {
  let component: WsrInitiatorComponent;
  let fixture: ComponentFixture<WsrInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WsrInitiatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsrInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
