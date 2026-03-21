import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMasterCreateUpdateComponent } from './user-master-create-update.component';

describe('UserMasterCreateUpdateComponent', () => {
  let component: UserMasterCreateUpdateComponent;
  let fixture: ComponentFixture<UserMasterCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserMasterCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMasterCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
