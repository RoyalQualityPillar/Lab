import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CciMasterActiveComponent } from './cci-master-active.component';

describe('CciMasterActiveComponent', () => {
  let component: CciMasterActiveComponent;
  let fixture: ComponentFixture<CciMasterActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CciMasterActiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CciMasterActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
