import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsaUpdateComponent } from './mrsa-update.component';

describe('MrsaUpdateComponent', () => {
  let component: MrsaUpdateComponent;
  let fixture: ComponentFixture<MrsaUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsaUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
