import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleRunMasterCreateUpdateComponent } from './sample-run-master-create-update.component';

describe('SampleRunMasterCreateUpdateComponent', () => {
  let component: SampleRunMasterCreateUpdateComponent;
  let fixture: ComponentFixture<SampleRunMasterCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SampleRunMasterCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleRunMasterCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
