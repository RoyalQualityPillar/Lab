import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fas1UpdateComponent } from './fas1-update.component';

describe('Fas1UpdateComponent', () => {
  let component: Fas1UpdateComponent;
  let fixture: ComponentFixture<Fas1UpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fas1UpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fas1UpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
