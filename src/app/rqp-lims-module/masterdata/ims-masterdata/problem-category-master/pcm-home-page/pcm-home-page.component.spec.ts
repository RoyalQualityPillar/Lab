import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcmHomePageComponent } from './pcm-home-page.component';

describe('PcmHomePageComponent', () => {
  let component: PcmHomePageComponent;
  let fixture: ComponentFixture<PcmHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PcmHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PcmHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
