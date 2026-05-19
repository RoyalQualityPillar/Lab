import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CciMasterHomePageComponent } from './cci-master-home-page.component';

describe('CciMasterHomePageComponent', () => {
  let component: CciMasterHomePageComponent;
  let fixture: ComponentFixture<CciMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CciMasterHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CciMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
