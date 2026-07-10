import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsssInitComponent } from './mrsss-init.component';

describe('MrsssInitComponent', () => {
  let component: MrsssInitComponent;
  let fixture: ComponentFixture<MrsssInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsssInitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsssInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
