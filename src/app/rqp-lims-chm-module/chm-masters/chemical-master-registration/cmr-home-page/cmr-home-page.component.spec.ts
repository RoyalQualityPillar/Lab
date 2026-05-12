import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmrHomePageComponent } from './cmr-home-page.component';

describe('CmrHomePageComponent', () => {
  let component: CmrHomePageComponent;
  let fixture: ComponentFixture<CmrHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmrHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmrHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
