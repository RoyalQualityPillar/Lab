import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ras2UpdateComponent } from './ras2-update.component';

describe('Ras2UpdateComponent', () => {
  let component: Ras2UpdateComponent;
  let fixture: ComponentFixture<Ras2UpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ras2UpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ras2UpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
