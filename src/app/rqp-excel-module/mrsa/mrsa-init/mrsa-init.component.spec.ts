import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsaInitComponent } from './mrsa-init.component';

describe('MrsaInitComponent', () => {
  let component: MrsaInitComponent;
  let fixture: ComponentFixture<MrsaInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsaInitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsaInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
