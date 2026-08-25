import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsleUpdateComponent } from './mrsle-update.component';

describe('MrsleUpdateComponent', () => {
  let component: MrsleUpdateComponent;
  let fixture: ComponentFixture<MrsleUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsleUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsleUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
