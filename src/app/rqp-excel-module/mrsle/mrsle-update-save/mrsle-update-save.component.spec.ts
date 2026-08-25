import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsleUpdateSaveComponent } from './mrsle-update-save.component';

describe('MrsleUpdateSaveComponent', () => {
  let component: MrsleUpdateSaveComponent;
  let fixture: ComponentFixture<MrsleUpdateSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsleUpdateSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsleUpdateSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
