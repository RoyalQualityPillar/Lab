import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyTypeMasterCreateUpdateComponent } from './study-type-master-create-update.component';

describe('StudyTypeMasterCreateUpdateComponent', () => {
  let component: StudyTypeMasterCreateUpdateComponent;
  let fixture: ComponentFixture<StudyTypeMasterCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyTypeMasterCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyTypeMasterCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
