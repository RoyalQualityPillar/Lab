import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AqNominationHomePageComponent } from './aq-nomination-home-page.component';

describe('AqNominationHomePageComponent', () => {
  let component: AqNominationHomePageComponent;
  let fixture: ComponentFixture<AqNominationHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqNominationHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AqNominationHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
