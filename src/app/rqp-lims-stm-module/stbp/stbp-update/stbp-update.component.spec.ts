import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StbpUpdateComponent } from './stbp-update.component';

describe('StbpUpdateComponent', () => {
  let component: StbpUpdateComponent;
  let fixture: ComponentFixture<StbpUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StbpUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StbpUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
