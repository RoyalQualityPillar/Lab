import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleSetMasterCreateUpdateComponent } from './sample-set-master-create-update.component';

describe('SampleSetMasterCreateUpdateComponent', () => {
  let component: SampleSetMasterCreateUpdateComponent;
  let fixture: ComponentFixture<SampleSetMasterCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SampleSetMasterCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleSetMasterCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
