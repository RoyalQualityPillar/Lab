import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenLogMasterCreateUpdateComponent } from './even-log-master-create-update.component';

describe('EvenLogMasterCreateUpdateComponent', () => {
  let component: EvenLogMasterCreateUpdateComponent;
  let fixture: ComponentFixture<EvenLogMasterCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvenLogMasterCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvenLogMasterCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
