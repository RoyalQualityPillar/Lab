import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StabilityProtScheRecCreateUpdateComponent } from './stability-prot-sche-rec-create-update.component';

describe('StabilityProtScheRecCreateUpdateComponent', () => {
  let component: StabilityProtScheRecCreateUpdateComponent;
  let fixture: ComponentFixture<StabilityProtScheRecCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StabilityProtScheRecCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StabilityProtScheRecCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
