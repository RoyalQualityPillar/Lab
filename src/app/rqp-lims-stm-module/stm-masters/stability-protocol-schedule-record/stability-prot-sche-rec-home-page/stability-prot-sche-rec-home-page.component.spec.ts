import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StabilityProtScheRecHomePageComponent } from './stability-prot-sche-rec-home-page.component';

describe('StabilityProtScheRecHomePageComponent', () => {
  let component: StabilityProtScheRecHomePageComponent;
  let fixture: ComponentFixture<StabilityProtScheRecHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StabilityProtScheRecHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StabilityProtScheRecHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
