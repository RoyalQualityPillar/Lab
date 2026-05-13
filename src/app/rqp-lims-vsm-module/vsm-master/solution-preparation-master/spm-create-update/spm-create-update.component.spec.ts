import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpmCreateUpdateComponent } from './spm-create-update.component';

describe('SpmCreateUpdateComponent', () => {
  let component: SpmCreateUpdateComponent;
  let fixture: ComponentFixture<SpmCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpmCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpmCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
