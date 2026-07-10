import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsfdInitComponent } from './mrsfd-init.component';

describe('MrsfdInitComponent', () => {
  let component: MrsfdInitComponent;
  let fixture: ComponentFixture<MrsfdInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsfdInitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsfdInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
