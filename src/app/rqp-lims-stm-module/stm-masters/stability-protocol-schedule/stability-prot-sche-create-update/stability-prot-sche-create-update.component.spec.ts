import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StabilityProtScheCreateUpdateComponent } from './stability-prot-sche-create-update.component';

describe('StabilityProtScheCreateUpdateComponent', () => {
  let component: StabilityProtScheCreateUpdateComponent;
  let fixture: ComponentFixture<StabilityProtScheCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StabilityProtScheCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StabilityProtScheCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
