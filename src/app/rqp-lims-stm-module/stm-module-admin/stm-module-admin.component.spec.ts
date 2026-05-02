import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StmModuleAdminComponent } from './stm-module-admin.component';

describe('StmModuleAdminComponent', () => {
  let component: StmModuleAdminComponent;
  let fixture: ComponentFixture<StmModuleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StmModuleAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StmModuleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
