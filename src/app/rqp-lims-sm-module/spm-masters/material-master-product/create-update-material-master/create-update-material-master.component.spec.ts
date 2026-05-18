import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateMaterialMasterComponent } from './create-update-material-master.component';

describe('CreateUpdateMaterialMasterComponent', () => {
  let component: CreateUpdateMaterialMasterComponent;
  let fixture: ComponentFixture<CreateUpdateMaterialMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateMaterialMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateMaterialMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
