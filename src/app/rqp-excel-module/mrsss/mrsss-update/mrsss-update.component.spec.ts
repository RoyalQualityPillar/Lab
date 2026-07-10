import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsssUpdateComponent } from './mrsss-update.component';

describe('MrsssUpdateComponent', () => {
  let component: MrsssUpdateComponent;
  let fixture: ComponentFixture<MrsssUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsssUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsssUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
