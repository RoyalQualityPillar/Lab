import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChambersShellMasterCreateUpdateComponent } from './chambers-shell-master-create-update.component';

describe('ChambersShellMasterCreateUpdateComponent', () => {
  let component: ChambersShellMasterCreateUpdateComponent;
  let fixture: ComponentFixture<ChambersShellMasterCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChambersShellMasterCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChambersShellMasterCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
