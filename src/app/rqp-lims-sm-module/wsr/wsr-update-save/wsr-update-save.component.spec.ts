import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsrUpdateSaveComponent } from './wsr-update-save.component';

describe('WsrUpdateSaveComponent', () => {
  let component: WsrUpdateSaveComponent;
  let fixture: ComponentFixture<WsrUpdateSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WsrUpdateSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsrUpdateSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
