import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSolutionCreateUpdateComponent } from './test-solution-create-update.component';

describe('TestSolutionCreateUpdateComponent', () => {
  let component: TestSolutionCreateUpdateComponent;
  let fixture: ComponentFixture<TestSolutionCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestSolutionCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSolutionCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
