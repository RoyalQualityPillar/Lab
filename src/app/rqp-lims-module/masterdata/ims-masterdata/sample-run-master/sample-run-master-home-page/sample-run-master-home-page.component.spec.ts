import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleRunMasterHomePageComponent } from './sample-run-master-home-page.component';

describe('SampleRunMasterHomePageComponent', () => {
  let component: SampleRunMasterHomePageComponent;
  let fixture: ComponentFixture<SampleRunMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SampleRunMasterHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleRunMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
