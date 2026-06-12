import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageCategoryMasterCreateUpdateComponent } from './storage-category-master-create-update.component';

describe('StorageCategoryMasterCreateUpdateComponent', () => {
  let component: StorageCategoryMasterCreateUpdateComponent;
  let fixture: ComponentFixture<StorageCategoryMasterCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StorageCategoryMasterCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorageCategoryMasterCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
