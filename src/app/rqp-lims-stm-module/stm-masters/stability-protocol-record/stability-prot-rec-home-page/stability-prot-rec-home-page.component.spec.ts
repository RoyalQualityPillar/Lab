import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StabilityProtRecHomePageComponent } from './stability-prot-rec-home-page.component';

describe('StabilityProtRecHomePageComponent', () => {
  let component: StabilityProtRecHomePageComponent;
  let fixture: ComponentFixture<StabilityProtRecHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StabilityProtRecHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StabilityProtRecHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
