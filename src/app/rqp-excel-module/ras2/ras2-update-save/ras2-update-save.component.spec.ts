import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ras2UpdateSaveComponent } from './ras2-update-save.component';

describe('Ras2UpdateSaveComponent', () => {
  let component: Ras2UpdateSaveComponent;
  let fixture: ComponentFixture<Ras2UpdateSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ras2UpdateSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ras2UpdateSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
