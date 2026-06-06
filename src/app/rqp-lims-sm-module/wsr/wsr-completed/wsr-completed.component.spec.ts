import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsrCompletedComponent } from './wsr-completed.component';

describe('WsrCompletedComponent', () => {
  let component: WsrCompletedComponent;
  let fixture: ComponentFixture<WsrCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WsrCompletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsrCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
