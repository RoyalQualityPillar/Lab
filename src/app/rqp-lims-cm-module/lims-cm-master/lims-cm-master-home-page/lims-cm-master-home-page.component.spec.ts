import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimsCmMasterHomePageComponent } from './lims-cm-master-home-page.component';

describe('LimsCmMasterHomePageComponent', () => {
  let component: LimsCmMasterHomePageComponent;
  let fixture: ComponentFixture<LimsCmMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimsCmMasterHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LimsCmMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
