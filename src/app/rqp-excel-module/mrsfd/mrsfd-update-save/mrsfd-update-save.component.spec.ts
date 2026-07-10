import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsfdUpdateSaveComponent } from './mrsfd-update-save.component';

describe('MrsfdUpdateSaveComponent', () => {
  let component: MrsfdUpdateSaveComponent;
  let fixture: ComponentFixture<MrsfdUpdateSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsfdUpdateSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsfdUpdateSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
