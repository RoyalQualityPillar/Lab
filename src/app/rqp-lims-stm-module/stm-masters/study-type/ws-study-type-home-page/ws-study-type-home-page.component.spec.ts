import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsStudyTypeHomePageComponent } from './ws-study-type-home-page.component';

describe('WsStudyTypeHomePageComponent', () => {
  let component: WsStudyTypeHomePageComponent;
  let fixture: ComponentFixture<WsStudyTypeHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WsStudyTypeHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsStudyTypeHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
