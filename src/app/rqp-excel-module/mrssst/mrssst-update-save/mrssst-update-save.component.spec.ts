import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrssstUpdateSaveComponent } from './mrssst-update-save.component';

describe('MrssstUpdateSaveComponent', () => {
  let component: MrssstUpdateSaveComponent;
  let fixture: ComponentFixture<MrssstUpdateSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrssstUpdateSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrssstUpdateSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
