import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CciMasterCreateUpdateComponent } from './cci-master-create-update.component';

describe('CciMasterCreateUpdateComponent', () => {
  let component: CciMasterCreateUpdateComponent;
  let fixture: ComponentFixture<CciMasterCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CciMasterCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CciMasterCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
