import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodMasterHomePageComponent } from './method-master-home-page.component';

describe('MethodMasterHomePageComponent', () => {
  let component: MethodMasterHomePageComponent;
  let fixture: ComponentFixture<MethodMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MethodMasterHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MethodMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
