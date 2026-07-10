import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsssUpdateSaveComponent } from './mrsss-update-save.component';

describe('MrsssUpdateSaveComponent', () => {
  let component: MrsssUpdateSaveComponent;
  let fixture: ComponentFixture<MrsssUpdateSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsssUpdateSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsssUpdateSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
