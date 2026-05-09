import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VsuHomePageComponent } from './vsu-home-page.component';

describe('VsuHomePageComponent', () => {
  let component: VsuHomePageComponent;
  let fixture: ComponentFixture<VsuHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VsuHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VsuHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
