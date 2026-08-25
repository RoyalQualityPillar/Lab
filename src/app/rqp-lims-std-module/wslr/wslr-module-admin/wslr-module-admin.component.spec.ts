import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WslrModuleAdminComponent } from './wslr-module-admin.component';

describe('WslrModuleAdminComponent', () => {
  let component: WslrModuleAdminComponent;
  let fixture: ComponentFixture<WslrModuleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WslrModuleAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WslrModuleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
