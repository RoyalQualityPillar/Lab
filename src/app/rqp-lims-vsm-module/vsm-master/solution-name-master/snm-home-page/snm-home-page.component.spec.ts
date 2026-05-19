import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnmHomePageComponent } from './snm-home-page.component';

describe('SnmHomePageComponent', () => {
  let component: SnmHomePageComponent;
  let fixture: ComponentFixture<SnmHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnmHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnmHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
