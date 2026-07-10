import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrssstUpdateComponent } from './mrssst-update.component';

describe('MrssstUpdateComponent', () => {
  let component: MrssstUpdateComponent;
  let fixture: ComponentFixture<MrssstUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrssstUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrssstUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
