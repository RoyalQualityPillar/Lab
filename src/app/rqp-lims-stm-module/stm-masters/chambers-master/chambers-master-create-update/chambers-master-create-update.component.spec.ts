import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChambersMasterCreateUpdateComponent } from './chambers-master-create-update.component';

describe('ChambersMasterCreateUpdateComponent', () => {
  let component: ChambersMasterCreateUpdateComponent;
  let fixture: ComponentFixture<ChambersMasterCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChambersMasterCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChambersMasterCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
