import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrssstInitComponent } from './mrssst-init.component';

describe('MrssstInitComponent', () => {
  let component: MrssstInitComponent;
  let fixture: ComponentFixture<MrssstInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrssstInitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrssstInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
