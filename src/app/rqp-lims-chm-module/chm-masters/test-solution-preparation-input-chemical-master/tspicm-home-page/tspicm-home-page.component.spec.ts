import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TspicmHomePageComponent } from './tspicm-home-page.component';

describe('TspicmHomePageComponent', () => {
  let component: TspicmHomePageComponent;
  let fixture: ComponentFixture<TspicmHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TspicmHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TspicmHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
