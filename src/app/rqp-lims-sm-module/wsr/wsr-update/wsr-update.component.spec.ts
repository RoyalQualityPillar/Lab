import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsrUpdateComponent } from './wsr-update.component';

describe('WsrUpdateComponent', () => {
  let component: WsrUpdateComponent;
  let fixture: ComponentFixture<WsrUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WsrUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
