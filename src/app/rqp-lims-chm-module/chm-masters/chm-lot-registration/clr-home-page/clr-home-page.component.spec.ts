import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClrHomePageComponent } from './clr-home-page.component';

describe('ClrHomePageComponent', () => {
  let component: ClrHomePageComponent;
  let fixture: ComponentFixture<ClrHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClrHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClrHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
