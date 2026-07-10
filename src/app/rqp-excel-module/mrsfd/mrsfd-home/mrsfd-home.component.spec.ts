import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsfdHomeComponent } from './mrsfd-home.component';

describe('MrsfdHomeComponent', () => {
  let component: MrsfdHomeComponent;
  let fixture: ComponentFixture<MrsfdHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsfdHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsfdHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
