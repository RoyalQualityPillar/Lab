import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsleHomeComponent } from './mrsle-home.component';

describe('MrsleHomeComponent', () => {
  let component: MrsleHomeComponent;
  let fixture: ComponentFixture<MrsleHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsleHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsleHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
