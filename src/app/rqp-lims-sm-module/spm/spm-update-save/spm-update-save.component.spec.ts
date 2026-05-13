import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpmUpdateSaveComponent } from './spm-update-save.component';

describe('SpmUpdateSaveComponent', () => {
  let component: SpmUpdateSaveComponent;
  let fixture: ComponentFixture<SpmUpdateSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpmUpdateSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpmUpdateSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
