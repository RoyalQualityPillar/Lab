import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsTemplateIndexHomePageComponent } from './ws-template-index-home-page.component';

describe('WsTemplateIndexHomePageComponent', () => {
  let component: WsTemplateIndexHomePageComponent;
  let fixture: ComponentFixture<WsTemplateIndexHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WsTemplateIndexHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsTemplateIndexHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
