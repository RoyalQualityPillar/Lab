import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClMasterHomePageComponent } from './cl-master-home-page.component';

describe('ClMasterHomePageComponent', () => {
  let component: ClMasterHomePageComponent;
  let fixture: ComponentFixture<ClMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClMasterHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
