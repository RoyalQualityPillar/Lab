import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClrCreateUpdateComponent } from './clr-create-update.component';

describe('ClrCreateUpdateComponent', () => {
  let component: ClrCreateUpdateComponent;
  let fixture: ComponentFixture<ClrCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClrCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClrCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
