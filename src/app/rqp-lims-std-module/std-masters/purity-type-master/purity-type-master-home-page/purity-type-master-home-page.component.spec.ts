import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurityTypeMasterHomePageComponent } from './purity-type-master-home-page.component';

describe('PurityTypeMasterHomePageComponent', () => {
  let component: PurityTypeMasterHomePageComponent;
  let fixture: ComponentFixture<PurityTypeMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurityTypeMasterHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurityTypeMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
