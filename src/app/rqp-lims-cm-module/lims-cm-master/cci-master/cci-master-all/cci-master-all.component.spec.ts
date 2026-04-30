import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CciMasterAllComponent } from './cci-master-all.component';

describe('CciMasterAllComponent', () => {
  let component: CciMasterAllComponent;
  let fixture: ComponentFixture<CciMasterAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CciMasterAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CciMasterAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
