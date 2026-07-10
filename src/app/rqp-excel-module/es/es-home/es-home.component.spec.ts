import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsHomeComponent } from './es-home.component';

describe('EsHomeComponent', () => {
  let component: EsHomeComponent;
  let fixture: ComponentFixture<EsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
