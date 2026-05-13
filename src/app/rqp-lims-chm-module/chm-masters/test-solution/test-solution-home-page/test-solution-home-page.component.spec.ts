import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSolutionHomePageComponent } from './test-solution-home-page.component';

describe('TestSolutionHomePageComponent', () => {
  let component: TestSolutionHomePageComponent;
  let fixture: ComponentFixture<TestSolutionHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestSolutionHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSolutionHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
