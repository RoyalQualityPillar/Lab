import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimsSpcMasterHomePageComponent } from './lims-spc-master-home-page.component';

describe('LimsSpcMasterHomePageComponent', () => {
  let component: LimsSpcMasterHomePageComponent;
  let fixture: ComponentFixture<LimsSpcMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LimsSpcMasterHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LimsSpcMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
