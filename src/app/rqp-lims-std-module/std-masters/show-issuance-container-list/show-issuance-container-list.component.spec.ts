import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowIssuanceContainerListComponent } from './show-issuance-container-list.component';

describe('ShowIssuanceContainerListComponent', () => {
  let component: ShowIssuanceContainerListComponent;
  let fixture: ComponentFixture<ShowIssuanceContainerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowIssuanceContainerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowIssuanceContainerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
