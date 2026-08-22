import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuanceContainerListComponent } from './issuance-container-list.component';

describe('IssuanceContainerListComponent', () => {
  let component: IssuanceContainerListComponent;
  let fixture: ComponentFixture<IssuanceContainerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssuanceContainerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssuanceContainerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
