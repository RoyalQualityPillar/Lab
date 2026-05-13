import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmrCreateUpdateComponent } from './cmr-create-update.component';

describe('CmrCreateUpdateComponent', () => {
  let component: CmrCreateUpdateComponent;
  let fixture: ComponentFixture<CmrCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmrCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmrCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
