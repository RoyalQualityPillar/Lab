import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMaterialMasterAtComponent } from './all-material-master-at.component';

describe('AllMaterialMasterAtComponent', () => {
  let component: AllMaterialMasterAtComponent;
  let fixture: ComponentFixture<AllMaterialMasterAtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMaterialMasterAtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllMaterialMasterAtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
