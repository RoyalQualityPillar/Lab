import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtMasterCreateUpdateComponent } from './ut-master-create-update.component';

describe('UtMasterCreateUpdateComponent', () => {
  let component: UtMasterCreateUpdateComponent;
  let fixture: ComponentFixture<UtMasterCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtMasterCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtMasterCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
