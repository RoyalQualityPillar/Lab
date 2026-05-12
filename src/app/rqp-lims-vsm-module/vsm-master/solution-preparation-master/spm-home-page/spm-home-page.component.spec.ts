import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpmHomePageComponent } from './spm-home-page.component';

describe('SpmHomePageComponent', () => {
  let component: SpmHomePageComponent;
  let fixture: ComponentFixture<SpmHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpmHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpmHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
