import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AqmModuleAdminComponent } from './aqm-module-admin.component';

describe('AqmModuleAdminComponent', () => {
  let component: AqmModuleAdminComponent;
  let fixture: ComponentFixture<AqmModuleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqmModuleAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AqmModuleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
