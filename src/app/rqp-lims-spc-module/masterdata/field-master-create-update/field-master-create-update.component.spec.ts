import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldMasterCreateUpdateComponent } from './field-master-create-update.component';

describe('FieldMasterCreateUpdateComponent', () => {
  let component: FieldMasterCreateUpdateComponent;
  let fixture: ComponentFixture<FieldMasterCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FieldMasterCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldMasterCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
