import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnmCreateUpdateComponent } from './snm-create-update.component';

describe('SnmCreateUpdateComponent', () => {
  let component: SnmCreateUpdateComponent;
  let fixture: ComponentFixture<SnmCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnmCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnmCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
