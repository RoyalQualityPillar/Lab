import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsmHomePageComponent } from './tsm-home-page.component';

describe('TsmHomePageComponent', () => {
  let component: TsmHomePageComponent;
  let fixture: ComponentFixture<TsmHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TsmHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TsmHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
