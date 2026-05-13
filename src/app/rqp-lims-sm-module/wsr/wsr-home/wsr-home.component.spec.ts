import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsrHomeComponent } from './wsr-home.component';

describe('WsrHomeComponent', () => {
  let component: WsrHomeComponent;
  let fixture: ComponentFixture<WsrHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WsrHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsrHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
