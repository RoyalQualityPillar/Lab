import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChmModuleAdminComponent } from './chm-module-admin.component';

describe('ChmModuleAdminComponent', () => {
  let component: ChmModuleAdminComponent;
  let fixture: ComponentFixture<ChmModuleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChmModuleAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChmModuleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
