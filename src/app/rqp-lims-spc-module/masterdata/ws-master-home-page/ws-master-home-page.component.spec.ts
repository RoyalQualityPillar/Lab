import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsMasterHomePageComponent } from './ws-master-home-page.component';

describe('WsMasterHomePageComponent', () => {
  let component: WsMasterHomePageComponent;
  let fixture: ComponentFixture<WsMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WsMasterHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
