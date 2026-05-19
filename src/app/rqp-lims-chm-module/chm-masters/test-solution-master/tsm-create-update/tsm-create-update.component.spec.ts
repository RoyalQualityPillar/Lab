import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsmCreateUpdateComponent } from './tsm-create-update.component';

describe('TsmCreateUpdateComponent', () => {
  let component: TsmCreateUpdateComponent;
  let fixture: ComponentFixture<TsmCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TsmCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TsmCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
