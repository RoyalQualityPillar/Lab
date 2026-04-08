import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmCompletedComponent } from './cm-completed.component';

describe('CmCompletedComponent', () => {
  let component: CmCompletedComponent;
  let fixture: ComponentFixture<CmCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmCompletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
