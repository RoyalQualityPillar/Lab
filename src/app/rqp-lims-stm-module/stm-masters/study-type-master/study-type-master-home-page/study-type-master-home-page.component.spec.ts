import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyTypeMasterHomePageComponent } from './study-type-master-home-page.component';

describe('StudyTypeMasterHomePageComponent', () => {
  let component: StudyTypeMasterHomePageComponent;
  let fixture: ComponentFixture<StudyTypeMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyTypeMasterHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyTypeMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
