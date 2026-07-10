import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsaHomeComponent } from './mrsa-home.component';

describe('MrsaHomeComponent', () => {
  let component: MrsaHomeComponent;
  let fixture: ComponentFixture<MrsaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsaHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
