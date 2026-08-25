import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ras2InitComponent } from './ras2-init.component';

describe('Ras2InitComponent', () => {
  let component: Ras2InitComponent;
  let fixture: ComponentFixture<Ras2InitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ras2InitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ras2InitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
