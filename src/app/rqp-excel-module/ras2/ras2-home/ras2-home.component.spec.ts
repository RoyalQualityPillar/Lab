import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ras2HomeComponent } from './ras2-home.component';

describe('Ras2HomeComponent', () => {
  let component: Ras2HomeComponent;
  let fixture: ComponentFixture<Ras2HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ras2HomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ras2HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
