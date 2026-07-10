import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsaUpdateSaveComponent } from './mrsa-update-save.component';

describe('MrsaUpdateSaveComponent', () => {
  let component: MrsaUpdateSaveComponent;
  let fixture: ComponentFixture<MrsaUpdateSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsaUpdateSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsaUpdateSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
