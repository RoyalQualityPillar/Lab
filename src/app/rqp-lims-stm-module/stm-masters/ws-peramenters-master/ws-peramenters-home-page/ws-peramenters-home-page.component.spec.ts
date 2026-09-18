import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsPeramentersHomePageComponent } from './ws-peramenters-home-page.component';

describe('WsPeramentersHomePageComponent', () => {
  let component: WsPeramentersHomePageComponent;
  let fixture: ComponentFixture<WsPeramentersHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WsPeramentersHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsPeramentersHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
