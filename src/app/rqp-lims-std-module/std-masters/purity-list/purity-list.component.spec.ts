import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurityListComponent } from './purity-list.component';

describe('PurityListComponent', () => {
  let component: PurityListComponent;
  let fixture: ComponentFixture<PurityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurityListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
