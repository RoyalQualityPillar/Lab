import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsleCompletedSaveComponent } from './mrsle-completed-save.component';

describe('MrsleCompletedSaveComponent', () => {
  let component: MrsleCompletedSaveComponent;
  let fixture: ComponentFixture<MrsleCompletedSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsleCompletedSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsleCompletedSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
