import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialMasterHomePageComponent } from './material-master-home-page.component';

describe('MaterialMasterHomePageComponent', () => {
  let component: MaterialMasterHomePageComponent;
  let fixture: ComponentFixture<MaterialMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialMasterHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
