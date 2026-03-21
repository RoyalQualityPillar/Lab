import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenLogMasterHomePageComponent } from './even-log-master-home-page.component';

describe('EvenLogMasterHomePageComponent', () => {
  let component: EvenLogMasterHomePageComponent;
  let fixture: ComponentFixture<EvenLogMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvenLogMasterHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvenLogMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
