import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsmCompletedComponent } from './ism-completed.component';

describe('IsmCompletedComponent', () => {
  let component: IsmCompletedComponent;
  let fixture: ComponentFixture<IsmCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IsmCompletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsmCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
