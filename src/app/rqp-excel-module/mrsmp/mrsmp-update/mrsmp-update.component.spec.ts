import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsmpUpdateComponent } from './mrsmp-update.component';

describe('MrsmpUpdateComponent', () => {
  let component: MrsmpUpdateComponent;
  let fixture: ComponentFixture<MrsmpUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsmpUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsmpUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
