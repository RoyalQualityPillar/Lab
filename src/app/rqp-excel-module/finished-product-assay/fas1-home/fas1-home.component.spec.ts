import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fas1HomeComponent } from './fas1-home.component';

describe('Fas1HomeComponent', () => {
  let component: Fas1HomeComponent;
  let fixture: ComponentFixture<Fas1HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fas1HomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fas1HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
