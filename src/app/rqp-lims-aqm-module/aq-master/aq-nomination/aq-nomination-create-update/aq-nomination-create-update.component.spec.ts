import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AqNominationCreateUpdateComponent } from './aq-nomination-create-update.component';

describe('AqNominationCreateUpdateComponent', () => {
  let component: AqNominationCreateUpdateComponent;
  let fixture: ComponentFixture<AqNominationCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AqNominationCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AqNominationCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
