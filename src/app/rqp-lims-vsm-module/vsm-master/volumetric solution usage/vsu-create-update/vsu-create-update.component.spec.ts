import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VsuCreateUpdateComponent } from './vsu-create-update.component';

describe('VsuCreateUpdateComponent', () => {
  let component: VsuCreateUpdateComponent;
  let fixture: ComponentFixture<VsuCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VsuCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VsuCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
