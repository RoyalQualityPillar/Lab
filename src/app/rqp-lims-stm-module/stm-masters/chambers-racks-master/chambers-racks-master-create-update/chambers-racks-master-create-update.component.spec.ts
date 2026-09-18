import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChambersRacksMasterCreateUpdateComponent } from './chambers-racks-master-create-update.component';

describe('ChambersRacksMasterCreateUpdateComponent', () => {
  let component: ChambersRacksMasterCreateUpdateComponent;
  let fixture: ComponentFixture<ChambersRacksMasterCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChambersRacksMasterCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChambersRacksMasterCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
