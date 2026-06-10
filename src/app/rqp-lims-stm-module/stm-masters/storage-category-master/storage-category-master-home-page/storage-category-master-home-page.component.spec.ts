import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageCategoryMasterHomePageComponent } from './storage-category-master-home-page.component';

describe('StorageCategoryMasterHomePageComponent', () => {
  let component: StorageCategoryMasterHomePageComponent;
  let fixture: ComponentFixture<StorageCategoryMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StorageCategoryMasterHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorageCategoryMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
