import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WslrCompletedSaveComponent } from './wslr-completed-save.component';

describe('WslrCompletedSaveComponent', () => {
  let component: WslrCompletedSaveComponent;
  let fixture: ComponentFixture<WslrCompletedSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WslrCompletedSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WslrCompletedSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
