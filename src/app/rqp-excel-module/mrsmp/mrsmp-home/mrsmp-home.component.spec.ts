import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsmpHomeComponent } from './mrsmp-home.component';

describe('MrsmpHomeComponent', () => {
  let component: MrsmpHomeComponent;
  let fixture: ComponentFixture<MrsmpHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsmpHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsmpHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
