import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsfdUpdateComponent } from './mrsfd-update.component';

describe('MrsfdUpdateComponent', () => {
  let component: MrsfdUpdateComponent;
  let fixture: ComponentFixture<MrsfdUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsfdUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsfdUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
