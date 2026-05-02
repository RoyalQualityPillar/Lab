import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpmUpdateComponent } from './spm-update.component';

describe('SpmUpdateComponent', () => {
  let component: SpmUpdateComponent;
  let fixture: ComponentFixture<SpmUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpmUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpmUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
