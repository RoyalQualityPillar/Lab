import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TspicmCreateUpdateComponent } from './tspicm-create-update.component';

describe('TspicmCreateUpdateComponent', () => {
  let component: TspicmCreateUpdateComponent;
  let fixture: ComponentFixture<TspicmCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TspicmCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TspicmCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
