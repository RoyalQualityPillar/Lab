import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fas1UpdateSaveComponent } from './fas1-update-save.component';

describe('Fas1UpdateSaveComponent', () => {
  let component: Fas1UpdateSaveComponent;
  let fixture: ComponentFixture<Fas1UpdateSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fas1UpdateSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fas1UpdateSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
