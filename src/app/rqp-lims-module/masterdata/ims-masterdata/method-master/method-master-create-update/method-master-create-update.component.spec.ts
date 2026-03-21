import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodMasterCreateUpdateComponent } from './method-master-create-update.component';

describe('MethodMasterCreateUpdateComponent', () => {
  let component: MethodMasterCreateUpdateComponent;
  let fixture: ComponentFixture<MethodMasterCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MethodMasterCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MethodMasterCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
