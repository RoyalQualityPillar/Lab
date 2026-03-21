import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMasterHomePageComponent } from './user-master-home-page.component';

describe('UserMasterHomePageComponent', () => {
  let component: UserMasterHomePageComponent;
  let fixture: ComponentFixture<UserMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserMasterHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
