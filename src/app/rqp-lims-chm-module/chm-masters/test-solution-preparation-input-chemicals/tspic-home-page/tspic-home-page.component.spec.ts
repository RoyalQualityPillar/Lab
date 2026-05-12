import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TspicHomePageComponent } from './tspic-home-page.component';

describe('TspicHomePageComponent', () => {
  let component: TspicHomePageComponent;
  let fixture: ComponentFixture<TspicHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TspicHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TspicHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
