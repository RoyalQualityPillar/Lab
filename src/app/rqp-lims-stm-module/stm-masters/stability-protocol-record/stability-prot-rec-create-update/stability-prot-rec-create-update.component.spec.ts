import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StabilityProtRecCreateUpdateComponent } from './stability-prot-rec-create-update.component';

describe('StabilityProtRecCreateUpdateComponent', () => {
  let component: StabilityProtRecCreateUpdateComponent;
  let fixture: ComponentFixture<StabilityProtRecCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StabilityProtRecCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StabilityProtRecCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
