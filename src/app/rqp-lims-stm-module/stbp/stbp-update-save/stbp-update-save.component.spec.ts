import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StbpUpdateSaveComponent } from './stbp-update-save.component';

describe('StbpUpdateSaveComponent', () => {
  let component: StbpUpdateSaveComponent;
  let fixture: ComponentFixture<StbpUpdateSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StbpUpdateSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StbpUpdateSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
