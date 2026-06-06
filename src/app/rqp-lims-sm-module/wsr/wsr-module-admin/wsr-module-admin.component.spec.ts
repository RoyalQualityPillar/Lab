import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsrModuleAdminComponent } from './wsr-module-admin.component';

describe('WsrModuleAdminComponent', () => {
  let component: WsrModuleAdminComponent;
  let fixture: ComponentFixture<WsrModuleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WsrModuleAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsrModuleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
