import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WslrUpdateComponent } from './wslr-update.component';

describe('WslrUpdateComponent', () => {
  let component: WslrUpdateComponent;
  let fixture: ComponentFixture<WslrUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WslrUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WslrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
