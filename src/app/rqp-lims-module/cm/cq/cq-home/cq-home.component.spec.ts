import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CqHomeComponent } from './cq-home.component';

describe('CqHomeComponent', () => {
  let component: CqHomeComponent;
  let fixture: ComponentFixture<CqHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CqHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CqHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
