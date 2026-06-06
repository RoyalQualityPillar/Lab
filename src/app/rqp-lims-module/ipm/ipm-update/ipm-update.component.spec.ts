import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpmUpdateComponent } from './ipm-update.component';

describe('IpmUpdateComponent', () => {
  let component: IpmUpdateComponent;
  let fixture: ComponentFixture<IpmUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IpmUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpmUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
