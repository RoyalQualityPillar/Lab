import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsmpUpdateSaveComponent } from './mrsmp-update-save.component';

describe('MrsmpUpdateSaveComponent', () => {
  let component: MrsmpUpdateSaveComponent;
  let fixture: ComponentFixture<MrsmpUpdateSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsmpUpdateSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsmpUpdateSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
