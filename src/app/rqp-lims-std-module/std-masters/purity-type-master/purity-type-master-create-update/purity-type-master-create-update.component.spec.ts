import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurityTypeMasterCreateUpdateComponent } from './purity-type-master-create-update.component';

describe('PurityTypeMasterCreateUpdateComponent', () => {
  let component: PurityTypeMasterCreateUpdateComponent;
  let fixture: ComponentFixture<PurityTypeMasterCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurityTypeMasterCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurityTypeMasterCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
