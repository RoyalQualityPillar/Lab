import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClMasterCreateUpdateComponent } from './cl-master-create-update.component';

describe('ClMasterCreateUpdateComponent', () => {
  let component: ClMasterCreateUpdateComponent;
  let fixture: ComponentFixture<ClMasterCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClMasterCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClMasterCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
