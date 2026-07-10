import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsmpInitComponent } from './mrsmp-init.component';

describe('MrsmpInitComponent', () => {
  let component: MrsmpInitComponent;
  let fixture: ComponentFixture<MrsmpInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsmpInitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsmpInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
