import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageConditioMasterCreateUpdateComponent } from './storage-conditio-master-create-update.component';

describe('StorageConditioMasterCreateUpdateComponent', () => {
  let component: StorageConditioMasterCreateUpdateComponent;
  let fixture: ComponentFixture<StorageConditioMasterCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StorageConditioMasterCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorageConditioMasterCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
