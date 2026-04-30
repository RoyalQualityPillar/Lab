import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnMasterCreateUpdateComponent } from './column-master-create-update.component';

describe('ColumnMasterCreateUpdateComponent', () => {
  let component: ColumnMasterCreateUpdateComponent;
  let fixture: ComponentFixture<ColumnMasterCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnMasterCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnMasterCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
