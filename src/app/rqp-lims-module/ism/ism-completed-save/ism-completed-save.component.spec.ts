import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsmCompletedSaveComponent } from './ism-completed-save.component';

describe('IsmCompletedSaveComponent', () => {
  let component: IsmCompletedSaveComponent;
  let fixture: ComponentFixture<IsmCompletedSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IsmCompletedSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsmCompletedSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
