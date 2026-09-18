import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StabilityProtScheHomePageComponent } from './stability-prot-sche-home-page.component';

describe('StabilityProtScheHomePageComponent', () => {
  let component: StabilityProtScheHomePageComponent;
  let fixture: ComponentFixture<StabilityProtScheHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StabilityProtScheHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StabilityProtScheHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
