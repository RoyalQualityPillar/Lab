import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsrCompletedSaveComponent } from './wsr-completed-save.component';

describe('WsrCompletedSaveComponent', () => {
  let component: WsrCompletedSaveComponent;
  let fixture: ComponentFixture<WsrCompletedSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WsrCompletedSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsrCompletedSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
