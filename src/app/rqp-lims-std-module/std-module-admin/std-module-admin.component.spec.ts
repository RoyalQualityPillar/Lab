import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdModuleAdminComponent } from './std-module-admin.component';

describe('StdModuleAdminComponent', () => {
  let component: StdModuleAdminComponent;
  let fixture: ComponentFixture<StdModuleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StdModuleAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StdModuleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
