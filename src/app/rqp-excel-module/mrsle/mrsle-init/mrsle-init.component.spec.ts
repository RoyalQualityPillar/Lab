import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsleInitComponent } from './mrsle-init.component';

describe('MrsleInitComponent', () => {
  let component: MrsleInitComponent;
  let fixture: ComponentFixture<MrsleInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsleInitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsleInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
