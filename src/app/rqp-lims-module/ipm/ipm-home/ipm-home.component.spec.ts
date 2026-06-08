import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpmHomeComponent } from './ipm-home.component';

describe('IpmHomeComponent', () => {
  let component: IpmHomeComponent;
  let fixture: ComponentFixture<IpmHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IpmHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpmHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
