import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpmModuleAdminComponent } from './spm-module-admin.component';

describe('SpmModuleAdminComponent', () => {
  let component: SpmModuleAdminComponent;
  let fixture: ComponentFixture<SpmModuleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpmModuleAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpmModuleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
