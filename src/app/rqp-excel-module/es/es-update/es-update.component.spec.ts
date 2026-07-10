import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsUpdateComponent } from './es-update.component';

describe('EsUpdateComponent', () => {
  let component: EsUpdateComponent;
  let fixture: ComponentFixture<EsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
