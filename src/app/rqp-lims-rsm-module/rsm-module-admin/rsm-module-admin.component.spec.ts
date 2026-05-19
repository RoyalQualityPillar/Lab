import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsmModuleAdminComponent } from './rsm-module-admin.component';

describe('RsmModuleAdminComponent', () => {
  let component: RsmModuleAdminComponent;
  let fixture: ComponentFixture<RsmModuleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RsmModuleAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RsmModuleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
