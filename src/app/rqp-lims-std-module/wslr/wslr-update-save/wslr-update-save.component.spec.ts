import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WslrUpdateSaveComponent } from './wslr-update-save.component';

describe('WslrUpdateSaveComponent', () => {
  let component: WslrUpdateSaveComponent;
  let fixture: ComponentFixture<WslrUpdateSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WslrUpdateSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WslrUpdateSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
