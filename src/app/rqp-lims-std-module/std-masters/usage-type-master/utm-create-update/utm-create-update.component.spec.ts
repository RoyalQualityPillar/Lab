import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtmCreateUpdateComponent } from './utm-create-update.component';

describe('UtmCreateUpdateComponent', () => {
  let component: UtmCreateUpdateComponent;
  let fixture: ComponentFixture<UtmCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UtmCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtmCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
