import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageConditioMasterHomePageComponent } from './storage-conditio-master-home-page.component';

describe('StorageConditioMasterHomePageComponent', () => {
  let component: StorageConditioMasterHomePageComponent;
  let fixture: ComponentFixture<StorageConditioMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StorageConditioMasterHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorageConditioMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
