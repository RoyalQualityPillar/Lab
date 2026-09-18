import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChambersTypeMasterCreateUpdateComponent } from './chambers-type-master-create-update.component';

describe('ChambersTypeMasterCreateUpdateComponent', () => {
  let component: ChambersTypeMasterCreateUpdateComponent;
  let fixture: ComponentFixture<ChambersTypeMasterCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChambersTypeMasterCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChambersTypeMasterCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
