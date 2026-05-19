import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimsCmModuleHomePageComponent } from './lims-cm-module-home-page.component';

describe('LimsCmModuleHomePageComponent', () => {
  let component: LimsCmModuleHomePageComponent;
  let fixture: ComponentFixture<LimsCmModuleHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimsCmModuleHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LimsCmModuleHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
