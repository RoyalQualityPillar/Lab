import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TspicCreateUpdateComponent } from './tspic-create-update.component';

describe('TspicCreateUpdateComponent', () => {
  let component: TspicCreateUpdateComponent;
  let fixture: ComponentFixture<TspicCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TspicCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TspicCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
