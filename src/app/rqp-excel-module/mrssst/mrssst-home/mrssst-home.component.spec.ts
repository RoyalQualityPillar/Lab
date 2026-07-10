import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrssstHomeComponent } from './mrssst-home.component';

describe('MrssstHomeComponent', () => {
  let component: MrssstHomeComponent;
  let fixture: ComponentFixture<MrssstHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrssstHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrssstHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
