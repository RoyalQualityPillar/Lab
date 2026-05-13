import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleRegestrationVsCreateUpdateComponent } from './sample-regestration-vs-create-update.component';

describe('SampleRegestrationVsCreateUpdateComponent', () => {
  let component: SampleRegestrationVsCreateUpdateComponent;
  let fixture: ComponentFixture<SampleRegestrationVsCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SampleRegestrationVsCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleRegestrationVsCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
