import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WslrCompletedComponent } from './wslr-completed.component';

describe('WslrCompletedComponent', () => {
  let component: WslrCompletedComponent;
  let fixture: ComponentFixture<WslrCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WslrCompletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WslrCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
