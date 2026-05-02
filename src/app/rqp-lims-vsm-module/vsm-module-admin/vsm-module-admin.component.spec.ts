import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VsmModuleAdminComponent } from './vsm-module-admin.component';

describe('VsmModuleAdminComponent', () => {
  let component: VsmModuleAdminComponent;
  let fixture: ComponentFixture<VsmModuleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VsmModuleAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VsmModuleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
