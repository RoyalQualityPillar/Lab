import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleSetMasterHomePageComponent } from './sample-set-master-home-page.component';

describe('SampleSetMasterHomePageComponent', () => {
  let component: SampleSetMasterHomePageComponent;
  let fixture: ComponentFixture<SampleSetMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SampleSetMasterHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleSetMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
