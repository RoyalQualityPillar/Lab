import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtmHomePageComponent } from './utm-home-page.component';

describe('UtmHomePageComponent', () => {
  let component: UtmHomePageComponent;
  let fixture: ComponentFixture<UtmHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UtmHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtmHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
